"""
Module with URLs for Video app
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import VideoViewSet

"""
Router for DRF ViewSets with following requests:

VideoViewSet:
    video/ - video-list:
        GET - list of video
        POST - create video
    video/{video_id}/ - video-detail:
        GET - get video with video_id
        PUT - replace value in all fields of video with video_id
        PATCH - change value in specific fields of video with video_id
        DELETE - remove video with video_id
"""
router = DefaultRouter()
router.register(r"video", VideoViewSet, basename="video")

urlpatterns = [
    path("", include(router.urls)),
]
