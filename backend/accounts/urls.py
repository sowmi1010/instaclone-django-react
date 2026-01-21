from django.urls import path
from .views import RegisterView, FollowUserView, UnfollowUserView, FollowersListView, FollowingListView, UsersListView, MyFollowingView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('follow/<int:user_id>/', FollowUserView.as_view()),
    path('unfollow/<int:user_id>/', UnfollowUserView.as_view()),
    path('followers/<int:user_id>/', FollowersListView.as_view()),
    path('following/<int:user_id>/', FollowingListView.as_view()),
    path('users/', UsersListView.as_view()),
path('following/me/', MyFollowingView.as_view()),


]
