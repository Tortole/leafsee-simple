"""
Module for DRF serializers of authentication models
"""

from rest_framework import serializers

from .models import Subscription


class SubscriberListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.username


class VideoSerializer(serializers.ModelSerializer):
    """
    DRF serializer for Subscription model

    Fields:
        !!!name - type!!! - !!!desc

        From Video model (by Meta):
            !!!name - type!!! - !!!desc

            Writable:
                - !!!name

            Read-only:
                - !!!name
    """

    subscribers = SubscriberListingField(many=True, read_only=True)

    class Meta:
        model = Subscription
        fields = [
            # >>>> Serializer field >>>>
            "subscribers",
            # <<<< <<<<
            # >>>> Model field >>>>
            "id",
            # <<<< <<<<
        ]
        read_only_fields = ["id", "duration", "author", "upload_date"]
