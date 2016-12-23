from django.shortcuts import render

# Create your views here.

def landing_page(request):
    return render(request, 'website/landing_page.html')

def login(request):
    return render(request, 'website/login.html')
