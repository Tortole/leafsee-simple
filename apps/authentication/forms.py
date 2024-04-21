"""
Module with forms for authentication app
"""

from django import forms
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _

from .models import LeafseeUser


class LoginForm(forms.ModelForm):
    """
    Form based on LeafseeUser model and intended for login by username or e-mail
    """

    user_cache = None

    class Meta:
        model = LeafseeUser
        fields = ["username", "email", "password"]

    def __init__(self, request, *args, **kwargs):
        """
        Create form by request and ModelForm data
        """
        self.request = request
        super().__init__(*args, **kwargs)

        # Set username and email as non-required so that can log in using only one of them.
        self.fields["username"].required = False
        self.fields["email"].required = False

    def clean(self):
        """
        Validate fields and authenticate
        """
        email = self.cleaned_data.get("email")
        username = self.cleaned_data.get("username")
        password = self.cleaned_data.get("password")

        if not username and not email:
            raise ValidationError(
                _("Even one of username or e-mail should have a value."),
                code="required",
            )

        if (username or email) and password:
            self.user_cache = authenticate(
                self.request, username=username, email=email, password=password
            )
            if self.user_cache is None:
                raise ValidationError(
                    _("Not valid username, e-mail or password."),
                    code="invalid_login",
                )
            elif not self.user_cache.is_active:
                raise ValidationError(
                    _("This account is inactive."),
                    code="inactive",
                )

        return self.cleaned_data

    def get_user(self):
        """
        Get authenticated user
        """
        return self.user_cache
