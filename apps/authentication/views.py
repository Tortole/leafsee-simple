"""
Module with views for authentication app
"""

from django.views import View
from django.urls import reverse
from django.http import JsonResponse

from django.contrib.auth import login as auth_login

from .forms import LoginForm


class LoginView(View):
    """
    View for login by password and login field that contain username or e-mail.
    Accepts only post requests.
    """

    template_name = "authentication/login_form.html"
    authentication_form = LoginForm

    http_method_names = ["post"]

    def post(self, request, *args, **kwargs):
        """
        Filter login field value for username and e-mail, validate data and authenticate user
        """

        # Redirect page for successful login
        next_page = request.POST.get("next", reverse("main"))

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
            return JsonResponse({"success": True, "next_page": next_page})
        else:
            return JsonResponse({"success": False, "errors": form.errors})
