"""
Wile with a manager for running Django and React servers via Poetry
"""

import subprocess
import signal
import sys
import time
import os


class ServerManager:
    """
    Manager for running Django and React servers via Poetry
    """

    def __init__(self):
        # Running subprocess
        self.processes = []
        self.setup_signal_handlers()

    def setup_signal_handlers(self):
        """
        Setup signals handler to listen for actions
        """

        # Ctrl+C pressing listener
        signal.signal(signal.SIGINT, self.signal_terminate_handler)
        # Terminate console listener
        signal.signal(signal.SIGTERM, self.signal_terminate_handler)

    def signal_terminate_handler(self, signum, frame):
        """
        Handler for signals to terminate all processes
        """

        print(
            "\n",
            "A termination signal has been received, the servers are being stopped...",
        )
        self.terminate_all()
        sys.exit(0)

    def start_backend(self):
        """
        Run backend server
        """

        backend_dir = "backend/"
        cmd = "gunicorn configs.wsgi:application --bind=0.0.0.0:8000 --reload"

        print("Launching the backend server...")
        process = subprocess.Popen(
            cmd,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            preexec_fn=os.setsid if os.name != "nt" else None,
            cwd=backend_dir,
        )
        self.processes.append(("backend", process))
        print("The backend server is launched")

        return process

    def start_frontend(self):
        """
        Run frontend server
        """

        frontend_dir = "frontend/"
        cmd = "npm start"

        print("Launching the frontend server...")
        process = subprocess.Popen(
            cmd,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            preexec_fn=os.setsid if os.name != "nt" else None,
            cwd=frontend_dir,
        )
        self.processes.append(("frontend", process))
        print("The frontend server is launched")

        return process

    def terminate_all(self):
        """
        Terminates all processes correctly
        """

        print("Terminating all servers...")

        # Soft terminating
        for name, process in self.processes:
            if process.poll() is None:  # If the process is still running
                print(f"Terminating {name} server (PID: {process.pid})...")

                # Sending a termination signal to the entire process group
                if os.name != "nt":  # GNU/Linux
                    os.killpg(os.getpgid(process.pid), signal.SIGTERM)
                else:  # Windows
                    process.terminate()

        # Time for correct termination
        time.sleep(3)

        # Forced termination
        for name, process in self.processes:
            if process.poll() is None:  # If the process is still running
                print(f"Forced terminating {name} server (PID: {process.pid})...")

                # Sending a termination signal to the entire process group
                if os.name != "nt":  # GNU/Linux
                    os.killpg(os.getpgid(process.pid), signal.SIGKILL)
                else:  # Windows
                    process.kill()

    def monitor_output(self):
        """
        Outputs output messages from processes to the console
        """

        try:
            while True:
                for name, process in self.processes:
                    if process.stdout:
                        output = process.stdout.readline()
                        if output:
                            print(f"[{name}] {output.decode().strip()}")

                # Проверяем, все ли процессы еще работают
                if all(process.poll() is not None for _, process in self.processes):
                    break

                time.sleep(0.1)

        except KeyboardInterrupt:
            self.signal_terminate_handler(signal.SIGINT, None)
