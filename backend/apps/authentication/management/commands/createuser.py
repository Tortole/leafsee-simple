from getpass import getpass

from django.core.management.base import BaseCommand

from apps.authentication.models import LeafseeUser


class Command(BaseCommand):
    def handle(self, *args, **options):
        username = input("Enter username: ")
        email = input("Enter e-mail: ")
        password = getpass("Enter password: ")
        password_again = getpass("Enter password again: ")

        while password != password_again:
            print("Passwords are not equal, repeat")
            password = getpass("Enter password: ")
            password_again = getpass("Enter password again: ")

        LeafseeUser.objects.create_user(
            username=username, email=email, password=password
        )
