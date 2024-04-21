"""
Module with validators for authentication app
"""

from django.core import validators
from django.utils.deconstruct import deconstructible
from django.utils.translation import gettext_lazy as _


@deconstructible
class UsernameValidator(validators.RegexValidator):
    regex = r"^[\w\-_]+\Z"
    flags = 0
    message = _(
        "Enter a valid username. "
        "This value may contain only letters, numbers, and following characters: -_"
    )


@deconstructible
class NicknameValidator(validators.RegexValidator):
    regex = r"^[\w.@#$%^&*\-_=+*]+\Z"
    flags = 0
    message = _(
        "Enter a valid nickname. "
        "This value may contain only letters, numbers, and following characters: @#$%^&*-_=+*"
    )


@deconstructible
class FullNameValidator(validators.RegexValidator):
    regex = r"^[\w]+\Z"
    flags = 0


@deconstructible
class FirstNameValidator(FullNameValidator):
    message = _(
        "Enter a valid first name. "
        "This value may contain only letters and space character."
    )


@deconstructible
class LastNameValidator(FullNameValidator):
    message = _(
        "Enter a valid last name. "
        "This value may contain only letters and space character."
    )
