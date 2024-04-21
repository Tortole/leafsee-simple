"""
Module with models for user and relationships between them
"""

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

import datetime

from .validators import (
    UsernameValidator,
    NicknameValidator,
    FirstNameValidator,
    LastNameValidator,
)


class LeafseeUser(AbstractUser):
    """
    Model for user

    Fields:
        username - CharField - username
        password - user password
        email - EmailField - user e-mail
        first_name - CharField - user first name
        last_name - CharField - user last name
        nickname - CharField - public showing username, it can be non unique
        description - TextField - user's self-description
        password_change_date - DateField - last password change date
        avatar - ImageField - user's avatar image
        subscriptions - ManyToManyField - user's subscriptions to other users

    Notes:
        AbstractUser also contains:
            date_joined - DateTimeField - date when user's account was created
    """

    username = models.CharField(
        "username",
        max_length=140,
        unique=True,
        validators=[UsernameValidator()],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )
    email = models.EmailField(
        "email",
        max_length=140,
        unique=True,
        error_messages={
            "unique": _("A user with that e-mail already exists."),
        },
        blank=True,
    )

    first_name = models.CharField(
        "first name",
        max_length=140,
        blank=True,
        validators=[FirstNameValidator()],
    )
    last_name = models.CharField(
        "last name",
        max_length=140,
        blank=True,
        validators=[LastNameValidator()],
    )
    nickname = models.CharField(
        "nickname",
        max_length=140,
        blank=True,
        validators=[NicknameValidator()],
    )

    description = models.TextField("self-description")
    password_change_date = models.DateField(
        "last password change date", default=datetime.date.today
    )
    avatar = models.ImageField()

    subscriptions = models.ManyToManyField(
        "self",
        through="Subscriptions",
        through_fields=("subscriber", "content_creator"),
    )

    REQUIRED_FIELDS = ["email"]


class Subscriptions(models.Model):
    """
    Model for tracking subscriptions

    Fields:
        subscriber - ForeignKey(LeafseeUser) - who subscribed
        content_creator - ForeignKey(LeafseeUser) - subscribed to
        subscriptions_date - DateField - date of subscriptions

    Notes:
        Every model instance unique by subscriber and content_creator
    """

    subscriber = models.ForeignKey(
        LeafseeUser, related_name="subscriber", on_delete=models.CASCADE
    )
    content_creator = models.ForeignKey(
        LeafseeUser, related_name="content_creator", on_delete=models.CASCADE
    )
    subscriptions_date = models.DateField(auto_now_add=True)

    class Meta:
        # Unique pair of subscriber and content_creator
        constraints = [
            models.UniqueConstraint(
                fields=["subscriber", "content_creator"], name="unique_subscriptions"
            )
        ]
