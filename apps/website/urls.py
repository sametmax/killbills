
from django.conf.urls import url, include

from rest_framework import routers

from website import views

router = routers.DefaultRouter()
router.register('currencies', views.CurrencyViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^login/?', views.login),
    url(r'^operations/?', views.operations, name="operations"),
    url(r'^home/', views.landing_page),
    url(r'^$', views.landing_page),
    url(r'^', views.operations),
]
