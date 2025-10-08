"""
Module with views for video app
"""

from django.views import View
from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.parsers import FormParser, MultiPartParser

from .models import Video
from .serializers import VideoSerializer
from .permissions import IsAuthorOrReadOnly


class VideoViewSet(viewsets.ModelViewSet):
    """
    DRF viewset for VideoSerializer

    Functions:
        list - get list of all video
        create - create video with the arguments passed in the request body
        retrieve - get video by id
        update - replace values in all video fields by id with arguments passed in the request body
        partial_update - change values in certain video fields with id with arguments passed in
            the request body
        destroy - remove video by id
    """

    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    parser_classes = [FormParser, MultiPartParser]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class MainView(View):
    """
    View for render main page
    """

    template_name = "videos/main.html"

    def get(self, request):
        return render(request, self.template_name)
