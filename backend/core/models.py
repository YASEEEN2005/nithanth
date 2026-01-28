from django.db import models
from django.contrib.auth.models import User

class HelpRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='my_requests')

    helper = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='accepted_jobs'
    )

    title = models.CharField(max_length=200)
    description = models.TextField()
    phone = models.CharField(max_length=10)

    latitude = models.FloatField()
    longitude = models.FloatField()
    location_link = models.URLField()

    is_taken = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.title

class Notification(models.Model):
    to_user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15)

    def __str__(self):
        return self.user.username
