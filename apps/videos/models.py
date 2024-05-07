"""
Module with models for video and everything related to them
"""

from django.db import models

import cv2
from datetime import timedelta

from apps.authentication.models import LeafseeUser

from util_tools.wrappers.model_wrappers import extend_choices


class Rating(models.TextChoices):
    """
    Model for rating choices

    Available value:
        LIKE - "l"
        DISLIKE - "d"
    """

    LIKE = "l"
    DISLIKE = "d"


@extend_choices(Rating)
class VideoRating(models.TextChoices):
    """
    Model for video rating choices

    Available value:
        LIKE - "l"
        DISLIKE - "d"
        NONE - "n"
    """

    NONE = "n"


class Video(models.Model):
    """
    Model for video

    Fields:
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
              (only authenticated users can rate videos)
    """

    file = models.FileField(blank=False)
    duration = models.DurationField()
    name = models.CharField(max_length=250, blank=False)
    description = models.TextField(max_length=5000)
    author = models.ForeignKey(
        LeafseeUser,
        related_name="videos",
        blank=False,
        null=True,
        on_delete=models.SET_NULL,
    )
    upload_date = models.DateField(auto_now_add=True)
    preview_image = models.ImageField()
    tags = models.ManyToManyField("Tag", through="VideoTag")
    rated_views = models.ManyToManyField(LeafseeUser, through="VideoRatedViews")

    def _determining_video_duration(self, video_filepath):
        """
        Calculate and return video file duration
        """
        cap = cv2.VideoCapture(video_filepath)

        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        frame_rate = int(cap.get(cv2.CAP_PROP_FPS))

        duration_seconds = total_frames / frame_rate
        cap.release()

        return timedelta(seconds=duration_seconds)

    def save(self, *args, **kwargs):
        # Set video duration before save model
        self.duration = self._determining_video_duration(self.file.path)
        super().save(*args, **kwargs)


class VideoTag(models.Model):
    """
    Model for tag mappings to videos

    Fields:
        video - ForeignKey(Video) - link to video
        tag - ForeignKey(Tag) - link to tag

    Notes:
        Every model instance unique by video and tag
    """

    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    tag = models.ForeignKey(
        "Tag", related_name="tagged_videos", on_delete=models.CASCADE
    )

    class Meta:
        # Unique pair of video and tag
        constraints = [
            models.UniqueConstraint(fields=["video", "tag"], name="unique_video_tag")
        ]


class VideoRatedViews(models.Model):
    """
    Model for rated views mappings to videos

    Fields:
        video - ForeignKey(Video) - link to video
        user - ForeignKey(LeafseeUser) - link to user who have watched video and maybe rate it
        video_rating - CharField(choices=VideoRating) - video rating left by user
                                                        can only have values of choices
                                                        from VideoRating
        viewing_date - DateField - video last viewing date by user

    Notes:
        Every model instance unique by video and user
    """

    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    user = models.ForeignKey(
        LeafseeUser,
        related_name="viewed_videos",
        blank=False,
        null=True,
        on_delete=models.SET_NULL,
    )
    video_rating = models.CharField(
        max_length=1, choices=VideoRating, default=VideoRating.NONE
    )
    viewing_date = models.DateField(auto_now_add=True)

    class Meta:
        # Unique pair of video and user
        constraints = [
            models.UniqueConstraint(
                fields=["video", "user"], name="unique_video_rating_view"
            )
        ]


class Comment(models.Model):
    """
    Model for video comments

    Fields:
        text - TextField - comment text
        publication_date - DateField - comment publication date
        author - ForeignKey(LeafseeUser) - link to user who wrote and posted comment
        is_changed - BooleanField - comment text changing flag:
                                    True if comment was changed from first posted one,
                                    False otherwise
        is_delete - BooleanField - comment deleting flag:
                                   True if comment was deleted
                                   False otherwise
        commented_video - ForeignKey(Video) - link to video under which comment was posted
        commented_comment - ForeignKey(Comment) - link to comment for which current comment
                                                  is response, can be Null
        ratings - ManyToManyField(LeafseeUser, through=CommentRating)
            - links to users who rated comment
    """

    text = models.TextField(max_length=7500, blank=False)
    publication_date = models.DateField(auto_now_add=True)
    author = models.ForeignKey(
        LeafseeUser,
        blank=False,
        null=True,
        on_delete=models.SET_NULL,
        related_name="comments",
    )
    is_changed = models.BooleanField("is changed", default=False)
    is_delete = models.BooleanField("is delete", default=False)
    commented_video = models.ForeignKey(
        Video, on_delete=models.CASCADE, related_name="comments"
    )
    commented_comment = models.ForeignKey(
        "self", on_delete=models.PROTECT, null=True, related_name="responses"
    )
    ratings = models.ManyToManyField(LeafseeUser, through="CommentRating")


class CommentRating(models.Model):
    """
    Model for rating mappings to comment

    Fields:
        comment - ForeignKey(Comment) - link to rated comment
        user - ForeignKey(LeafseeUser) - link to user who rated comment
        comment_rating - CharField(choices=Rating) - comment rating left by user
                                                     can only have values of choices from Rating

    Notes:
        Every model instance unique by comment and user
    """

    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    user = models.ForeignKey(
        LeafseeUser,
        related_name="rated_comments",
        blank=False,
        null=True,
        on_delete=models.SET_NULL,
    )
    comment_rating = models.CharField(max_length=1, choices=Rating)

    class Meta:
        # Unique pair of comment and user
        constraints = [
            models.UniqueConstraint(
                fields=["comment", "user"], name="unique_comment_rating"
            )
        ]


class Tag(models.Model):
    """
    Model for video tags

    Fields:
        name - CharField - tag name
    """

    name = models.CharField(blank=False)
