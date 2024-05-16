from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from reservations import views as rviews
from . import views


router = routers.DefaultRouter()
router.register(r'parking_spots', rviews.ParkingSpotView, 'parking_spots')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home_page, name="home_page"),
    path('api/', include(router.urls)),
]
