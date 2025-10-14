"""
Project scripts for run through Poetry
"""

import sys
import argparse
import subprocess
import time

from .server_manager import ServerManager


def manager():
    subprocess.run(
        ["poetry", "run", "python", "backend/manage.py", *sys.argv[1:]], check=False
    )


def gunicorn():
    subprocess.run(
        ["poetry", "run", "gunicorn", "backend.configs.wsgi", *sys.argv[1:]],
        check=False,
    )


def tailwind():
    subprocess.run(
        ["npm", "run", "--prefix", "frontend", "t", *["--", *sys.argv[1:]]],
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


def full_start():
    manager = ServerManager()

    print("Launching servers...")
    manager.start_backend()
    manager.start_frontend()

    print(
        "\n",
        ">>>>> Open the website in the browser using the link http://localhost:5435",
        "\n",
        ">>>>> Press Ctrl+C to stop all servers",
        "\n",
        sep="",
    )

    # Time for servers to launch
    time.sleep(2)

    manager.monitor_output()


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
