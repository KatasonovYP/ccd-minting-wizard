import asyncio
import logging
import datetime

from jinja2 import Environment, FileSystemLoader, select_autoescape
from progress.bar import ShadyBar
from pathlib import Path

VERSION = 1
SOURCE_CARGO = Path('Cargo.toml')

logging.basicConfig(level=logging.INFO, filename=f"logs/{datetime.datetime.now()}.log")


async def source_build(binary, bar):
    command = "cargo concordium build -b \"dist/schemab64.txt\" --out dist/module.wasm.v1"
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


def main():
    env = Environment(
        loader=FileSystemLoader("src"),
        autoescape=select_autoescape()
    )
    template = env.get_template("lib.rs")
    with ShadyBar('1 | Processing Variations\t', max=64) as bar:
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
            result = template.render(context)
            Path(f"src/processed/{binary}/src/").mkdir(parents=True, exist_ok=True)
            with open(f"src/processed/{binary}/src/lib.rs", "w") as f:
                f.writelines(result)
            Path(f"src/processed/{binary}/Cargo.toml").write_text(SOURCE_CARGO.read_text())
            bar.next()
    with ShadyBar('2 | Compiling Sources\t\t', max=64) as bar:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(build_sources(bar))


if __name__ == "__main__":
    main()
