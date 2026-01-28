from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .models import HelpRequest, Notification, Profile
from django.shortcuts import get_object_or_404
from django.contrib.auth import update_session_auth_hash

def home(request):
    return render(request, 'home.html')

from django.shortcuts import render, redirect
from django.contrib.auth.models import User


def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        confirm = request.POST['confirm']
        phone = request.POST['phone']   # ✅ phone from form

        if password != confirm:
            return render(request, 'register.html', {
                'error': 'Passwords do not match'
            })

        if User.objects.filter(username=username).exists():
            return render(request, 'register.html', {
                'error': 'Username already exists'
            })

        # ✅ create user
        user = User.objects.create_user(
            username=username,
            password=password
        )

        # ✅ create profile with phone
        Profile.objects.create(
            user=user,
            phone=phone
        )

        return redirect('/login/')

    return render(request, 'register.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect('/community/')

        return render(request, 'login.html', {
            'error': 'Invalid username or password'
        })

    return render(request, 'login.html')


def logout_view(request):
    logout(request)
    return redirect('/login/')

@login_required
def community(request):
    posts = HelpRequest.objects.filter(is_taken=False).order_by('-created_at')
    return render(request, 'community.html', {'posts': posts})

@login_required
def post_help(request):
    if request.method == 'POST':
        lat = request.POST.get('latitude')
        lng = request.POST.get('longitude')

        map_link = f"https://www.google.com/maps?q={lat},{lng}"

        HelpRequest.objects.create(
            user=request.user,
            title=request.POST['title'],
            description=request.POST['description'],
            phone=request.POST['phone'],
            latitude=lat,
            longitude=lng,
            location_link=map_link
        )

        # ✅ IMPORTANT: POST kazhinju COMMUNITY page-il redirect
        return redirect('/community/')

    # ✅ GET request – show empty form
    return render(request, 'post-help.html')


from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, get_object_or_404
from .models import HelpRequest, Notification, Profile

@login_required
def accept_job(request, id):
    post = get_object_or_404(HelpRequest, id=id)

    # ❌ owner cannot accept own post
    if post.user == request.user:
        return redirect('/community/')

    # ❌ already taken
    if post.is_taken:
        return redirect('/community/')

    # ✅ accept job
    post.is_taken = True
    post.helper = request.user
    post.save()

    # 🔹 Ensure helper profile exists
    helper_profile, created = Profile.objects.get_or_create(
        user=request.user
    )

    helper_phone = (
        helper_profile.phone if helper_profile.phone else "Not provided"
    )

    # 🔔 CREATE NOTIFICATION FOR POST OWNER (WITH PHONE)
    Notification.objects.create(
        to_user=post.user,
        message=(
            f"{request.user.username} accepted your help request. "
            f"Phone: {helper_phone}"
        )
    )

    return redirect('/community/')

@login_required
def notifications(request):
    notes = Notification.objects.filter(
        to_user=request.user
    ).order_by('-created_at')

    return render(request, 'notifications.html', {'notes': notes})

@login_required
def my_profile(request):
    profile, created = Profile.objects.get_or_create(
        user=request.user
    )

    if request.method == 'POST':
        # update username
        request.user.username = request.POST['username']
        request.user.save()

        # update phone
        profile.phone = request.POST['phone']
        profile.save()

        # ✅ stay logged in, no logout needed
        return redirect('/profile/')

    return render(request, 'profile.html', {
        'profile': profile
    })

@login_required
def my_requests(request):
    posts = HelpRequest.objects.filter(user=request.user).order_by('-id')

    return render(request, 'my-requests.html', {
        'posts': posts
    })



@login_required
def change_password(request):
    if request.method == 'POST':
        old_password = request.POST['old_password']
        new_password = request.POST['new_password']
        confirm_password = request.POST['confirm_password']

        if not request.user.check_password(old_password):
            return render(request, 'change_password.html', {
                'error': 'Old password is incorrect'
            })

        if new_password != confirm_password:
            return render(request, 'change_password.html', {
                'error': 'Passwords do not match'
            })

        request.user.set_password(new_password)
        request.user.save()

        # 🔥 keep user logged in
        update_session_auth_hash(request, request.user)

        return redirect('/profile/')

    return render(request, 'change-password.html')
