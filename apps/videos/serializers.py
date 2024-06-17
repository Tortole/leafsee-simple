"""
Module for DRF serializers
"""

from rest_framework import serializers

from datetime import timedelta

from .models import Video, determining_video_duration


class VideoSerializer(serializers.ModelSerializer):
    """
    DRF serializer for Video model

    Fields:
        From Video model (by Meta):
            file - FileField - path to video file in media directory
            duration - DurationField - video duration
            name - CharField - public video name
            description - TextField - public video description
            author - ForeignKey(LeafseeUser) - user who uploaded video
            upload_date - DateField - video upload date
            preview_image - ImageField - image that is displayed on block with link to video
            tags - ManyToManyField(Tag, through=VideoTag) - links to video tags
            rated_views - ManyToManyField(LeafseeUser, through=VideoRatedViews)
                - links to users who have watched video and can rate it

            Writable:
                - file
                - name
                - description
                - preview_image

            Read-only:
                - duration
                - author
                - upload_date
                - tags
                - rated_views
    """

    class Meta:
        model = Video
        fields = "__all__"
        read_only_fields = ["duration", "author", "upload_date", "tags", "rated_views"]

    def create(self, validated_data):
        # Set video duration to zero to overwrite it later
        validated_data["duration"] = timedelta(seconds=0)
        instance = super().create(validated_data)
        # Calculate video duration and save it
        instance.duration = determining_video_duration(instance.file.path)
        instance.save(update_fields=["duration"])
        return instance
