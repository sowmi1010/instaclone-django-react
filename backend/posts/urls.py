from django.urls import path
from .views import PostCreateView, FeedView, LikePostView, CommentView,MyPostsView, DeletePostView

urlpatterns = [
    path('posts/create/', PostCreateView.as_view()),
    path('posts/feed/', FeedView.as_view()),
    path('posts/mine/', MyPostsView.as_view()),   # 👈 new
    path('posts/like/<int:post_id>/', LikePostView.as_view()),
    path('posts/comment/<int:post_id>/', CommentView.as_view()),
        path('posts/delete/<int:post_id>/', DeletePostView.as_view()),  # ✅ delete

]
