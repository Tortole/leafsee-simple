"""
Module for DRF view permissions
"""

from rest_framework import permissions


class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    Permission to allow any user to read the object and only the author of the object to edit it
    """

    def has_object_permission(self, request, view, obj):
        # Permission for read: GET, HEAD or OPTIONS requests
        if request.method in permissions.SAFE_METHODS:
            return True

        # Permission for write: only for the author of the object
        return obj.author == request.user
