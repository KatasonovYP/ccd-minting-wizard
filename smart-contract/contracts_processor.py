import asyncio
import logging
import datetime
import os

import local_secrets

from jinja2 import Environment, FileSystemLoader, select_autoescape
from progress.bar import ShadyBar
from pathlib import Path

VERSION = 1
SOURCE_CARGO = Path("templates/Cargo.toml")

os.makedirs("logs", exist_ok=True)
logging.basicConfig(level=logging.INFO, filename=f"logs/{datetime.datetime.now()}.log")

lock = asyncio.Lock()


async def source_build(binary, bar):
    command = f'cargo concordium build -e -v V1 -b "dist/schemab64.schema" --out dist/module.wasm.v1'
    process = await asyncio.create_subprocess_shell(
        command,
        cwd=Path(f"processed/{binary}/"),
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )

    _, stderr = await process.communicate()

    if process.returncode != 0:
        logging.error(f"Error while building {binary} source:\n{stderr.decode()}")
    bar.next()
    return process.returncode


async def build_sources(bar):
    tasks = []
    semaphore = asyncio.Semaphore(4)
    for i in range(0, 64):
        binary = f"{i:06b}"

        async def task(binary=binary):
            async with semaphore:
                await source_build(binary, bar)

        tasks.append(asyncio.create_task(task()))
    await asyncio.gather(*tasks)


async def test_run(binary, bar):
    command = f"cargo test --test tests"
    process = await asyncio.create_subprocess_shell(
        command,
        cwd=Path(f"processed/{binary}/"),
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )

    stdout, stderr = await process.communicate()

    if process.returncode != 0:
        logging.error(f"Error while testing {binary} contract:\n{stderr.decode()}")
    else:
        logging.info(f"{binary}:\n{stdout.decode()}")
    bar.next()
    return process.returncode


async def run_tests(bar):
    tasks = []
    semaphore = asyncio.Semaphore(8)
    for i in range(0, 64):
        binary = f"{i:06b}"

        async def task(binary=binary):
            async with semaphore:
                await test_run(binary, bar)

        tasks.append(asyncio.create_task(task()))
    await asyncio.gather(*tasks)


async def contract_deploy(binary, bar):
    async with lock:
        command = f"concordium-client module deploy dist/module.wasm.v1 --sender main --name mint_wizard_{binary}_V{VERSION} --no-confirm --grpc-port 20000 --grpc-ip grpc.mainnet.concordium.software --secure"
        process = await asyncio.create_subprocess_shell(
            command,
            cwd=Path(f"processed/{binary}/"),
            stdin=asyncio.subprocess.PIPE,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )

        async def handle_input():
            sender_password = local_secrets.SENDER_PASSWORD
            process.stdin.write(sender_password.encode() + b"\n")
            await process.stdin.drain()

        async def read_stream(stream):
            async for line in stream:
                stream_str = line.decode().strip()
                if "Deploying module..." in stream_str:
                    await asyncio.sleep(0.5)
                    await handle_input()
                elif "Module successfully deployed with reference:" in stream_str:
                    module_reference = stream_str.split(":")[-1]
                    for char in ["'", ".", " "]:
                        module_reference = module_reference.replace(char, "")
                    module_reference.strip()
                    with open(f"processed/{binary}/reference.module", "w") as f:
                        f.write(module_reference)

        await asyncio.gather(
            read_stream(process.stderr),
            read_stream(process.stdout),
        )

        bar.next()
        return process.returncode


async def deploy_contracts(bar):
    tasks = []
    for i in range(0, 64):
        binary = f"{i:06b}"
        tasks.append(asyncio.ensure_future(contract_deploy(binary, bar)))
    await asyncio.gather(*tasks)


def main():
    env = Environment(
        loader=FileSystemLoader("templates"), autoescape=select_autoescape()
    )
    source_template = env.get_template("src/lib.rs")
    tests_template = env.get_template("tests/tests.rs")
    with ShadyBar("1 | Processing Variations\t", max=64) as bar:
        for i in range(0, 64):
            binary = f"{i:06b}"
            context = {
                "mintable":     binary[0] != "0",
                "burnable":     binary[1] != "0",
                "pausable":     binary[2] != "0",
                "roles":        binary[3] != "0",
                "updates":      binary[4] != "0",
                "sponsored":    binary[5] != "0",
                "code":         binary,
                "version":      VERSION,
            }
            source_result = source_template.render(context)
            Path(f"processed/{binary}/src/").mkdir(parents=True, exist_ok=True)
            with open(f"processed/{binary}/src/lib.rs", "w") as f:
                f.writelines(source_result)
            tests_result = tests_template.render(context)
            Path(f"processed/{binary}/tests/").mkdir(parents=True, exist_ok=True)
            with open(f"processed/{binary}/tests/tests.rs", "w") as f:
                f.writelines(tests_result)
            Path(f"processed/{binary}/Cargo.toml").write_text(SOURCE_CARGO.read_text())
            bar.next()
    with ShadyBar("2 | Building Sources\t\t", max=64) as bar:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(build_sources(bar))
    with ShadyBar("3 | Running Tests\t\t", max=64) as bar:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(run_tests(bar))
    with ShadyBar("4 | Deploying Modules\t\t", max=64) as bar:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(deploy_contracts(bar))


if __name__ == "__main__":
    main()
