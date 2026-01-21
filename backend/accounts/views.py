from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .serializers import RegisterSerializer
from .models import User


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 👥 Follow User
class FollowUserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        user_to_follow = get_object_or_404(User, id=user_id)

        if user_to_follow == request.user:
            return Response({"error": "You cannot follow yourself"}, status=400)

        request.user.following.add(user_to_follow)
        return Response({"message": "User followed successfully"})


# 👥 Unfollow User
class UnfollowUserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        user_to_unfollow = get_object_or_404(User, id=user_id)

        request.user.following.remove(user_to_unfollow)
        return Response({"message": "User unfollowed successfully"})


# 👥 Followers List
class FollowersListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        followers = user.followers.all()
        data = [{"id": u.id, "username": u.username} for u in followers]
        return Response(data)


# 👥 Following List
class FollowingListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        following = user.following.all()
        data = [{"id": u.id, "username": u.username} for u in following]
        return Response(data)

# 👥 List all users
class UsersListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = User.objects.exclude(id=request.user.id)
        data = [{"id": u.id, "username": u.username} for u in users]
        return Response(data)


# 👥 My Following
class MyFollowingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        following = request.user.following.all()
        ids = [u.id for u in following]
        return Response(ids)
