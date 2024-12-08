"""
Module with views for authentication app
"""

from django.views import View
from django.http import JsonResponse

from django.contrib.auth import login as auth_login
from django.contrib.auth.views import LogoutView as AuthLogoutView

from .forms import LoginForm, RegistrationForm


class LoginView(View):
    """
    View for login by password and login field that contain username or e-mail.
    Accepts only post requests.
    """

    authentication_form = LoginForm

    http_method_names = ["post"]

    def post(self, request):
        """
        Filter login field value for username and e-mail, validate data and authenticate user
        """

        form_data = {}
        form_data["password"] = request.POST["password"]

        login = request.POST["login"]
        if "@" in login:
            # If login field contain e-mail
            form_data["username"] = None
            form_data["email"] = login
        else:
            # If login field contain username
            form_data["username"] = login
            form_data["email"] = None

        form = self.authentication_form(request, data=form_data)

        if form.is_valid():
            auth_login(request, form.get_user())
            return JsonResponse({"success": True})
        else:
            return JsonResponse({"success": False, "errors": form.errors})


class AuthenticatedStatusView(View):
    """
    View to check if the user is authenticated.
    Accepts only get requests.
    """

    http_method_names = ["get"]

    def get(self, request):
        """
        Check if the user is authenticated and return response with the user's authentication status
        """

        if request.user.is_authenticated:
            return JsonResponse({"isUserAuthenticated": True})
        else:
            return JsonResponse({"isUserAuthenticated": False})


class RegistrationView(View):
    """
    View for registration.
    Accepts only post requests.
    """

    class_form = RegistrationForm

    http_method_names = ["post"]

    def post(self, request):
        """
        Registers user by data in POST request
        """

        form = self.class_form(request.POST)

        if form.is_valid():
            auth_login(request, form.save())
            return JsonResponse({"success": True})
        else:
            return JsonResponse({"success": False, "errors": form.errors})


class LogoutView(AuthLogoutView):
    pass
