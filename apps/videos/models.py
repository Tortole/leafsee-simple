"""
Module with models for video and everything related to them
"""

from django.db import models
from django.utils import timesince

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


def generate_user_media_path(instance, filename, subfolder=None):
    """
    Generate path to uploaded user's media file: the file will be saved in
    MEDIA_ROOT/user_videos/<username>/<subfolder (if passed)>/<filename>

    Parameters:
        instance - Video - instance of the Video model for which path is generated
        filename - str - name of the file
        subfolder - str - subfolder where the file will be contained

    Return:
        path - str - path to save file
    """

    if subfolder:
        return f"user_videos/{instance.author.username}/{subfolder}/{filename}"
    else:
        return f"user_videos/{instance.author.username}/{filename}"


def generate_video_path(instance, filename):
    """
    Generate path to uploaded video

    Parameters:
        instance - Video - instance of the Video model for which path is generated
        filename - str - name of the video file

    Return:
        path - str - path to save video
    """

    return generate_user_media_path(instance, filename, "video")


def generate_preview_path(instance, filename):
    """
    Generate path to uploaded preview image for video

    Parameters:
        instance - Video - instance of the Video model for which path is generated
        filename - str - name of the preview file

    Return:
        path - str - path to save video
    """

    return generate_user_media_path(instance, filename, "preview")


def determining_video_duration(video_filepath):
    """
    Calculate and return video file duration

    Parameters:
        video_filepath - str - path to the video file

    Return:
        duration - datetime.timedelta - video duration
    """

    cap = cv2.VideoCapture(video_filepath)

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frame_rate = int(cap.get(cv2.CAP_PROP_FPS))

    duration_seconds = total_frames / frame_rate
    cap.release()

    return timedelta(seconds=duration_seconds)


class Video(models.Model):
    """
    Model for video

    Fields:
        file - FileField - path to video file in media directory
        duration - DurationField - video duration
        name - CharField - public video name
        description - TextField - public video description
        author - ForeignKey(LeafseeUser, related_name="videos") - user who uploaded video
        upload_date - DateTimeField - video upload date
        preview_image - ImageField - image that is displayed on block with link to video
        tags - ManyToManyField(Tag, through=VideoTag) - links to video tags
        auth_viewers - ManyToManyField(LeafseeUser, through=VideoRatedViews) - links to users who
            have watched video and can rate it (only authenticated users can rate videos)

    Property:
        likes - QuerySet(VideoRatedViews) - video views with like rating
        dislikes - QuerySet(VideoRatedViews) - video views with dislike rating
        none_rated - QuerySet(VideoRatedViews) - video views without rating
        timesince_upload - str - time since video was uploaded
    """

    file = models.FileField(blank=False, upload_to=generate_video_path)
    duration = models.DurationField(blank=True)
    name = models.CharField(max_length=250, blank=False)
    description = models.TextField(max_length=5000, blank=True)
    author = models.ForeignKey(
        LeafseeUser,
        related_name="videos",
        blank=False,
        null=True,
        on_delete=models.SET_NULL,
    )
    upload_date = models.DateTimeField(auto_now_add=True)
    preview_image = models.ImageField(blank=True, upload_to=generate_preview_path)
    tags = models.ManyToManyField("Tag", through="VideoTag")
    auth_viewers = models.ManyToManyField(LeafseeUser, through="VideoRatedViews")

    @property
    def likes(self):
        return self.rated_views.filter(video_rating=VideoRating.LIKE)

    @property
    def dislikes(self):
        return self.rated_views.filter(video_rating=VideoRating.DISLIKE)

    @property
    def none_rated(self):
        return self.rated_views.filter(video_rating=VideoRating.NONE)

    @property
    def timesince_upload(self):
        return timesince.timesince(self.upload_date)


class VideoTag(models.Model):
    """
    Model for tag mappings to videos

    Fields:
        video - ForeignKey(Video) - link to video
        tag - ForeignKey(Tag, related_name="tagged_videos") - link to tag

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
        video - ForeignKey(Video, related_name="rated_views") - link to video
        user - ForeignKey(LeafseeUser, related_name="viewed_videos") - link to user who have
            watched video and maybe rate it
        video_rating - CharField(choices=VideoRating) - video rating left by user
            can only have values of choices from VideoRating
        viewing_date - DateTimeField - video last viewing date by user

    Notes:
        Every model instance unique by video and user
    """

    video = models.ForeignKey(
        Video, related_name="rated_views", on_delete=models.CASCADE
    )
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
    viewing_date = models.DateTimeField(auto_now_add=True)

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
        publication_date - DateTimeField - comment publication date
        author - ForeignKey(LeafseeUser, related_name="comments") - link to user who wrote and
            posted comment
        is_changed - BooleanField - comment text changing flag:
            * True if comment was changed from first posted one
            * False otherwise
        is_delete - BooleanField - comment deleting flag:
            * True if comment was deleted
            * False otherwise
        commented_video - ForeignKey(Video, related_name="comments") - link to video under which
            comment was posted
        commented_comment - ForeignKey(Comment, related_name="responses") - link to comment for
            which current comment is response, can be Null
        rated - ManyToManyField(LeafseeUser, through=CommentRating) - links to users who
            rated comment
    """

    text = models.TextField(max_length=7500, blank=False)
    publication_date = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        LeafseeUser,
        related_name="comments",
        blank=False,
        null=True,
        on_delete=models.SET_NULL,
    )
    is_changed = models.BooleanField("is changed", default=False)
    is_delete = models.BooleanField("is delete", default=False)
    commented_video = models.ForeignKey(
        Video,
        related_name="comments",
        on_delete=models.CASCADE,
    )
    commented_comment = models.ForeignKey(
        "self",
        related_name="responses",
        on_delete=models.PROTECT,
        null=True,
    )
    rated = models.ManyToManyField(LeafseeUser, through="CommentRating")


class CommentRating(models.Model):
    """
    Model for rating mappings to comment

    Fields:
        comment - ForeignKey(Comment, related_name="rated_comments") - link to rated comment
        user - ForeignKey(LeafseeUser, related_name="rated_comments") - link to user
            who rated comment
        comment_rating - CharField(choices=Rating) - comment rating left by user
            can only have values of choices from Rating

    Notes:
        Every model instance unique by comment and user
    """

    comment = models.ForeignKey(
        Comment, related_name="ratings", on_delete=models.CASCADE
    )
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
