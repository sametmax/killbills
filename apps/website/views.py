from django.shortcuts import render, redirect

from lazysignup.decorators import allow_lazy_user

from rest_framework import viewsets

from website.models import Currency
from website.serializer import CurrencySerializer

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


# Create class
class CurrencyViewSet(viewsets.ModelViewSet):
    queryset = Currency.objects.all()
    serializer_class = CurrencySerializer
