"""
Project scripts for run through Poetry
"""

import sys
import argparse
import subprocess
from pathlib import Path


def manager():
    subprocess.run(
        ["poetry", "run", "python", "backend/manage.py", *sys.argv[1:]], check=False
    )


def tailwind():
    subprocess.run(
        [
            "npx",
            "tailwindcss",
            "-i",
            str(Path("apps/static/base/css/input.css")),
            "-o",
            str(Path("apps/static/base/css/out.css")),
            *sys.argv[1:],
        ],
        shell=True,
        check=False,
    )


def full_migrate():
    subprocess.run(
        ["poetry", "run", "python", "backend/manage.py", "makemigrations"], check=False
    )
    subprocess.run(
        ["poetry", "run", "python", "backend/manage.py", "migrate"], check=False
    )


def init():
    # Catch prod argument
    parser = argparse.ArgumentParser()
    parser.add_argument("--prod", dest="prod", action="store_true", default=False)
    args = parser.parse_args()

    # Actions in product and development project
    full_migrate()

    if args.prod:
        # Actions in product project
        pass
    else:
        # Actions in development project
        subprocess.run(["poetry", "run", "pre-commit", "install"], check=False)


def flake8():
    subprocess.run(["poetry", "run", "flake8", "."], check=False)


def black():
    subprocess.run(["poetry", "run", "black", "."], check=False)
    flake8()


def export_requirements():
    subprocess.run(
        [
            "poetry",
            "export",
            "-f",
            "requirements.txt",
            "-o",
            "requirements.txt",
            "--without-hashes",
        ],
        check=False,
    )
