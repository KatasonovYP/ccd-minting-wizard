import asyncio
import logging
import datetime

import local_secrets

from jinja2 import Environment, FileSystemLoader, select_autoescape
from progress.bar import ShadyBar
from pathlib import Path

VERSION = 1
SOURCE_CARGO = Path("Cargo.toml")

logging.basicConfig(level=logging.INFO, filename=f"logs/{datetime.datetime.now()}.log")

lock = asyncio.Lock()


async def source_build(binary, bar):
    command = f"cargo concordium build -v V{VERSION} -b \"dist/schemab64.txt\" --out dist/module.wasm.v1"
    process = await asyncio.create_subprocess_shell(command, cwd=Path(f"src/processed/{binary}/"), stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
    
    _, stderr = await process.communicate()
    
    if process.returncode != 0:
        logging.error(f"Error while building {binary} source:\n{stderr.decode()}")
    bar.next()
    return process.returncode


async def build_sources(bar):
    tasks = []
    for i in range(0, 64):
        binary = f"{i:06b}"
        tasks.append(asyncio.ensure_future(source_build(binary, bar)))
    semaphore = asyncio.Semaphore(16)
    async with semaphore:
        await asyncio.gather(*tasks)


async def contract_deploy(binary, bar):
    async with lock:
        command = f"concordium-client module deploy dist/module.wasm.v1 --sender {local_secrets.SENDER_ADDRESS} --name mint_wizard_{binary} --no-confirm --grpc-port 20000 --grpc-ip node.testnet.concordium.com"
        process = await asyncio.create_subprocess_shell(command, cwd=Path(f"src/processed/{binary}/"), stdin=asyncio.subprocess.PIPE, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)

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
                    for char in ["'", "."]:
                        module_reference = module_reference.replace(char, "")
                    module_reference.strip()
                    with open(f"src/processed/{binary}/reference.txt", "w") as f:
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
    semaphore = asyncio.Semaphore(16)
    async with semaphore:
        await asyncio.gather(*tasks)


def main():
    env = Environment(
        loader=FileSystemLoader("src"),
        autoescape=select_autoescape()
    )
    template = env.get_template("lib.rs")
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
            }
            result = template.render(context)
            Path(f"src/processed/{binary}/src/").mkdir(parents=True, exist_ok=True)
            with open(f"src/processed/{binary}/src/lib.rs", "w") as f:
                f.writelines(result)
            Path(f"src/processed/{binary}/Cargo.toml").write_text(SOURCE_CARGO.read_text())
            bar.next()
    with ShadyBar("2 | Compiling Sources\t\t", max=64) as bar:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(build_sources(bar))
    with ShadyBar("3 | Deploying Modules\t\t", max=64) as bar:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(deploy_contracts(bar))


if __name__ == "__main__":
    main()
