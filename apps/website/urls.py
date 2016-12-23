
from django.conf.urls import url

from website import views

urlpatterns = [
    url(r'^login/?', views.login),
    url(r'^', views.landing_page),
]
