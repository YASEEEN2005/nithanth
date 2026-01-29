from django.urls import path
from . import views
from .api_views import post_help_api, register_api
from .api_views import login_api
from core import api_views



urlpatterns = [
    path('', views.home),
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),   # 👈 ADD
    path('logout/', views.logout_view, name='logout'),
    path('community/', views.community, name='community'),
    path('post-help/', views.post_help, name='post_help'),
    path('accept/<int:id>/', views.accept_job, name='accept_job'),
    path('notifications/', views.notifications, name='notifications'),
    path('profile/', views.my_profile, name='profile'),
    path('my-requests/', views.my_requests, name='my_requests'),
    path('change-password/', views.change_password, name='change_password'),



  




]
