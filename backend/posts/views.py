from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Post, Comment
from .serializers import PostSerializer


class PostCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = PostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(
                user=request.user,
                city=request.data.get("city", "Chennai")  # 📍 save city
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FeedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        mood = request.GET.get("mood")   # ?mood=happy
        city = request.GET.get("city")   # ?city=Chennai

        posts = Post.objects.all().order_by('-created_at')

        if mood:
            posts = posts.filter(mood=mood)

        if city:
            posts = posts.filter(city__iexact=city)

        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


class LikePostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        post = get_object_or_404(Post, id=post_id)

        if request.user in post.likes.all():
            post.likes.remove(request.user)
            return Response({"message": "Unliked"})
        else:
            post.likes.add(request.user)
            return Response({"message": "Liked"})


class CommentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        post = get_object_or_404(Post, id=post_id)
        text = request.data.get("text")

        if not text:
            return Response({"error": "Comment text required"}, status=400)

        Comment.objects.create(
            post=post,
            user=request.user,
            text=text
        )
        return Response({"message": "Comment added"}, status=status.HTTP_201_CREATED)


class MyPostsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        posts = Post.objects.filter(user=request.user).order_by('-created_at')
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


class DeletePostView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, post_id):
        post = get_object_or_404(Post, id=post_id, user=request.user)
        post.delete()
        return Response({"message": "Post deleted successfully"}, status=status.HTTP_200_OK)
