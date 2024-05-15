from django.urls import path
from . import views


urlpatterns = [
    path('parking-spots/', views.parking_spots),
]
