from django.shortcuts import render, redirect

from lazysignup.decorators import allow_lazy_user

from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer

from website.models import Currency, MoneyBook
from website.serializer import (
    CurrencySerializer,
    MoneyBookSerializer,
)

# Create your views here.


def landing_page(request):
    if request.user.is_authenticated and "home" not in request.path:
        return redirect("moneybooks")

    return render(request, 'website/landing_page.html')


def login(request):
    return render(request, 'website/login.html')


@allow_lazy_user
def moneybooks(request):
    money_books = MoneyBook.objects.filter(owner=request.user)
    serializer = MoneyBookSerializer(money_books, many=True)
    money_books_json = JSONRenderer().render(serializer.data)
    return render(
        request, 
        'website/moneybooks.html', 
        {"money_books": money_books_json}
    )


# Create class
class CurrencyViewSet(viewsets.ModelViewSet):
    queryset = Currency.objects.all()
    serializer_class = CurrencySerializer


class MoneyBookViewSet(viewsets.ModelViewSet):
    queryset = MoneyBook.objects.all()
    serializer_class = MoneyBookSerializer

    def get_queryset(self):
        user = self.request.user
        return MoneyBook.objects.filter(owner=user)
