"""
Module with custom authentications classes
"""

from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model


class UsernameEmailAuthenticationBackend(ModelBackend):
    """
    Authenticate users by username or e-mails and passwords
    """

    def authenticate(self, request, username=None, email=None, password=None, **kwargs):
        """
        Authenticate user by username, if it is passed, or e-mails otherwise
        """
        if username and password:
            return super().authenticate(request, username, password, **kwargs)
        elif email and password:
            user_model = get_user_model()
            try:
                user = user_model.objects.get(email=email)
            except user_model.DoesNotExist:
                return None
            else:
                if user.check_password(password) and self.user_can_authenticate(user):
                    return user
            return None
        else:
            return None
