"""
Module with URLs for authentication app
"""

from django.urls import path
from .views import LoginView, AuthenticatedStatusView, RegistrationView, LogoutView


urlpatterns = [
    path("login", LoginView.as_view(), name="login"),
    path("status", AuthenticatedStatusView.as_view(), name="auth_status"),
    path("registration", RegistrationView.as_view(), name="registration"),
    path("logout", LogoutView.as_view(), name="logout"),
]
