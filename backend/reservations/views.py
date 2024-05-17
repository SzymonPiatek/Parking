from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import ParkingSpotSerializer, ParkingSpotReservationSerializer, UserSerializer
from .models import ParkingSpot, ParkingSpotReservation


class ParkingSpotView(viewsets.ModelViewSet):
    serializer_class = ParkingSpotSerializer
    queryset = ParkingSpot.objects.all()


class ParkingSpotReservationView(viewsets.ModelViewSet):
    serializer_class = ParkingSpotReservationSerializer
    queryset = ParkingSpotReservation.objects.all()


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
