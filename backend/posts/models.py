from django.db import models
from accounts.models import User

MOOD_CHOICES = [
    ("happy", "Happy"),
    ("sad", "Sad"),
    ("angry", "Angry"),
    ("stressed", "Stressed"),
    ("chill", "Chill"),
]

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    image = models.ImageField(upload_to="posts/")
    caption = models.TextField(blank=True)
    mood = models.CharField(max_length=20, choices=MOOD_CHOICES, default="happy")
    city = models.CharField(max_length=100, default="Chennai")   # ✅ default
    likes = models.ManyToManyField(User, related_name="liked_posts", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.caption


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text
