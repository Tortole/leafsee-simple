"""
Module with test for models in Videos app
"""

from django.conf import settings
from django.test import TestCase
from django.core.files import File

import cv2
import shutil
import numpy as np
from datetime import timedelta

from backend.apps.videos.models import Video
from backend.apps.authentication.models import LeafseeUser


TEST_DATA_DIRECTORY = settings.MEDIA_ROOT / "temp_test_data"


def setUpModule():
    """
    Run once before all class tests
    """
    TEST_DATA_DIRECTORY.mkdir(parents=True, exist_ok=True)


def tearDownModule():
    """
    Run once after all class tests
    """
    try:
        shutil.rmtree(TEST_DATA_DIRECTORY)
    except OSError:
        pass


class VideoTestCase(TestCase):

    def create_empty_video(self, video_filepath, duration_seconds):
        """
        Create empty video with specified duration and in specified location
        """
        fps = 30
        resolution = (640, 480)

        # Define codec
        fourcc = cv2.VideoWriter_fourcc(*"mp4v")
        out = cv2.VideoWriter(str(video_filepath), fourcc, fps, resolution)

        # Write empty frames for the specified duration
        for _ in range(int(fps * duration_seconds)):
            # Create an empty white frame
            frame = 255 * np.ones((resolution[1], resolution[0], 3), dtype=np.uint8)
            # Write the frame to the video
            out.write(frame)

        # Release the VideoWriter object
        out.release()

    @classmethod
    def setUpTestData(cls):
        """
        Run once to set up non-modified data for all class methods
        """
        cls.content_creator = LeafseeUser.objects.create_user(
            username="content_creator",
            password="password",
            email="content_creator@mail.com",
        )

    def setUp(self):
        """
        Setup run before every test method
        """
        pass

    def tearDown(self):
        """
        Clean up run after every test method
        """
        pass

    def test_determining_video_duration(self):
        """
        Check how model determining video duration
        """
        video_filepath = TEST_DATA_DIRECTORY / "empty_video.mp4"
        duration_seconds = 12
        self.create_empty_video(video_filepath, duration_seconds)

        video = Video.objects.create(
            file=File(open(video_filepath)), author=self.content_creator
        )

        self.assertEqual(video.duration, timedelta(seconds=duration_seconds))
