
from django.conf.urls import url, include

from rest_framework import routers

from website import views

router = routers.DefaultRouter()
router.register('currencies', views.CurrencyViewSet)
router.register('moneybooks', views.MoneyBookViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^login/?', views.login),
    url(r'^moneybooks/', views.moneybooks, name="moneybooks"),
    url(r'^home/', views.landing_page),
    url(r'^$', views.landing_page),
    url(r'^', views.moneybooks),
]
