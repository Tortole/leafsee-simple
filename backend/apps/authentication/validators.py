"""
Module with validators for authentication app
"""

from django.core import validators
from django.utils.deconstruct import deconstructible
from django.utils.translation import gettext_lazy as _

from re import UNICODE as re_UNICODE


@deconstructible
class UsernameValidator(validators.RegexValidator):
    regex = r"^[a-zA-Z0-9\-_]+\Z"
    flags = 0
    message = _(
        "Invalid username: may contain only latin letters, numbers, and "
        "following characters: -_"
    )


@deconstructible
class NicknameValidator(validators.RegexValidator):
    regex = r"^[a-zA-Z0-9.@#$%^&*\-_=+*]+\Z"
    flags = 0
    message = _(
        "Invalid nickname: may contain only latin letters, numbers, and "
        "following characters: @#$%%^&*-_=+*"
    )


@deconstructible
class FullNameValidator(validators.RegexValidator):
    regex = r"^[\w]+\Z"
    flags = re_UNICODE


@deconstructible
class FirstNameValidator(FullNameValidator):
    message = _(
        "Invalid first name: may contain only letters, numbers and space character."
    )


@deconstructible
class LastNameValidator(FullNameValidator):
    message = _(
        "Invalid last name: may contain only letters, numbers and space character."
    )
