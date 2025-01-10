"""
Module with models for user and relationships between them
"""

from django.db import models
from django.db.models import Q
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
        password_change_date - DateTimeField - last password change date
        avatar - ImageField - user's avatar image
        subscriptions - ManyToManyField - user's subscriptions to other users
        is_banned - BooleanField - true when user was blocked, false otherwise, false by default

    Notes:
        AbstractUser also contains:
            date_joined - DateTimeField - date when user's account was created
    """

    username_validators = [UsernameValidator()]
    username = models.CharField(
        "username",
        max_length=140,
        validators=username_validators,
        unique=True,
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )

    email = models.EmailField(
        "email",
        max_length=140,
        blank=True,
    )

    first_name = models.CharField(
        "first name",
        max_length=140,
        validators=[FirstNameValidator()],
        blank=True,
    )
    last_name = models.CharField(
        "last name",
        max_length=140,
        validators=[LastNameValidator()],
        blank=True,
    )
    nickname = models.CharField(
        "nickname",
        max_length=140,
        validators=[NicknameValidator()],
        blank=True,
    )

    description = models.TextField("self-description", blank=True)
    password_change_date = models.DateTimeField(
        "last password change date", default=datetime.date.today
    )
    avatar = models.ImageField()

    subscriptions = models.ManyToManyField(
        "self",
        through="Subscription",
        through_fields=("subscriber", "content_creator"),
    )

    is_banned = models.BooleanField("is banned", default=False)

    class Meta:
        constraints = [
            # Uniqueness condition for email field, ignoring fields with empty email strings
            models.UniqueConstraint(
                fields=["email"],
                condition=~Q(email=""),
                name="unique_email_not_empty",
                violation_error_code="unique",
                violation_error_message=_("A user with that e-mail already exists."),
            )
        ]


class Subscription(models.Model):
    """
    Model for tracking subscriptions

    Fields:
        subscriber - ForeignKey(LeafseeUser) - who subscribed
        content_creator - ForeignKey(LeafseeUser, related_name="subscribers") - subscribed to
        subscription_date - DateTimeField - date of subscription

    Notes:
        Every model instance unique by subscriber and content_creator
    """

    subscriber = models.ForeignKey(LeafseeUser, on_delete=models.CASCADE)
    content_creator = models.ForeignKey(
        LeafseeUser, related_name="subscribers", on_delete=models.CASCADE
    )
    subscription_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Unique pair of subscriber and content_creator
        constraints = [
            models.UniqueConstraint(
                fields=["subscriber", "content_creator"], name="unique_subscriptions"
            )
        ]
