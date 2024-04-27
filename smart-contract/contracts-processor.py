# import subprocess
import asyncio
import logging

from jinja2 import Environment, FileSystemLoader, select_autoescape
from progress.bar import ShadyBar
from pathlib import Path

VERSION = 1
SOURCE_CARGO = Path('Cargo.toml')

sem = asyncio.Semaphore(10)


async def source_compile(binary, bar):
    process = await asyncio.create_subprocess_shell("cargo concordium build -b \"dist/schemab64.txt\" --out dist/module.wasm.v1", cwd=Path(f"src/processed/{binary}/"), stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
    await process.communicate()
    bar.next()
    return process.returncode


async def safe_source_compile(binary, bar):
    async with sem:
        return await source_compile(binary, bar)


async def run_compile(bar):
    tasks = []
    for i in range(0, 128):
        binary = f"{i:07b}"
        tasks.append(asyncio.ensure_future(safe_source_compile(binary, bar)))
    await asyncio.gather(*tasks)


def main():
    env = Environment(
        loader=FileSystemLoader("src"),
        autoescape=select_autoescape()
    )
    template = env.get_template("lib.rs")
    with ShadyBar('1 | Processing Variations', max=128) as bar:
        for i in range(0, 128):
            binary = f"{i:07b}"
            context = {
                "mintable":     binary[0] != "0",
                "burnable":     binary[1] != "0",
                "pausable":     binary[2] != "0",
                "permit":       binary[3] != "0",
                "roles":        binary[4] != "0",
                "updates":      binary[5] != "0",
                "sponsored":    binary[6] != "0",
                "code":         binary,
                "version":      VERSION,
            }
            result = template.render(context)
            Path(f"src/processed/{binary}/src/").mkdir(parents=True, exist_ok=True)
            with open(f"src/processed/{binary}/src/lib.rs", "w") as f:
                f.writelines(result)
            Path(f"src/processed/{binary}/Cargo.toml").write_text(SOURCE_CARGO.read_text())
            bar.next()
    with ShadyBar('2 | Compiling Sources', max=128) as bar:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(run_compile(bar))


if __name__ == "__main__":
    main()
