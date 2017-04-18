from django.shortcuts import render, redirect
from lazysignup.decorators import allow_lazy_user

# Create your views here.

def landing_page(request):
    if request.user.is_authenticated:
        return redirect("operations")

    return render(request, 'website/landing_page.html')

def login(request):
    return render(request, 'website/login.html')

@allow_lazy_user
def operations(request):
    return render(request, 'website/operations.html')

