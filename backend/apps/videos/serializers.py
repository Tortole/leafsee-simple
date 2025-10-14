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
        author_username - CharField - author username
        author_nickname - CharField - author nickname
        author_avatar - ImageField - link to author avatar
        views_count - IntegerField - video views count
        likes_count - IntegerField - video likes count
        dislikes_count - IntegerField - video dislikes count

        From Video model (by Meta):
            id - int - video id
            file - FileField - path to video file in media directory
            duration - DurationField - video duration
            name - CharField - public video name
            description - TextField - public video description
            author - ForeignKey(LeafseeUser) - user who uploaded video
            upload_date - DateField - video upload date
            preview_image - ImageField - image that is displayed on block with link to video
            tags - ManyToManyField(Tag, through=VideoTag) - links to video tags

            Writable:
                - file
                - name
                - description
                - preview_image

            Read-only:
                - id
                - duration
                - author
                - upload_date
                - tags
    """

    author_username = serializers.CharField(source="author.username", read_only=True)
    author_nickname = serializers.CharField(source="author.nickname", read_only=True)
    author_avatar = serializers.ImageField(source="author.avatar", read_only=True)
    views_count = serializers.IntegerField(source="auth_viewers.count", read_only=True)
    likes_count = serializers.IntegerField(source="likes.count", read_only=True)
    dislikes_count = serializers.IntegerField(source="dislikes.count", read_only=True)
    timesince = serializers.CharField(source="timesince_upload", read_only=True)

    class Meta:
        model = Video
        fields = [
            # >>>> Serializer field >>>>
            "author_username",
            "author_nickname",
            "author_avatar",
            "views_count",
            "likes_count",
            "dislikes_count",
            "timesince",
            # <<<< <<<<
            # >>>> Model field >>>>
            "id",
            "file",
            "duration",
            "name",
            "description",
            "author",
            "upload_date",
            "preview_image",
            "tags",
            # <<<< <<<<
        ]
        read_only_fields = ["id", "duration", "author", "upload_date", "tags"]

    def create(self, validated_data):
        # Set video duration to zero to overwrite it later
        validated_data["duration"] = timedelta(seconds=0)
        instance = super().create(validated_data)
        # Calculate video duration and save it
        instance.duration = determining_video_duration(instance.file.path)
        instance.save(update_fields=["duration"])
        return instance
