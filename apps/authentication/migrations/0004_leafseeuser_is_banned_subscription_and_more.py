# Generated by Django 5.0.4 on 2024-05-04 12:11

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("authentication", "0003_alter_leafseeuser_email"),
    ]

    operations = [
        migrations.AddField(
            model_name="leafseeuser",
            name="is_banned",
            field=models.BooleanField(default=False, verbose_name="is banned"),
        ),
        migrations.CreateModel(
            name="Subscription",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("subscription_date", models.DateField(auto_now_add=True)),
                (
                    "content_creator",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="subscribers",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "subscriber",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.AlterField(
            model_name="leafseeuser",
            name="subscriptions",
            field=models.ManyToManyField(
                through="authentication.Subscription", to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.DeleteModel(
            name="Subscriptions",
        ),
        migrations.AddConstraint(
            model_name="subscription",
            constraint=models.UniqueConstraint(
                fields=("subscriber", "content_creator"), name="unique_subscriptions"
            ),
        ),
    ]
