from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ParkingSpotSerializer, ParkingSpotReservationSerializer
from .models import ParkingSpot, ParkingSpotReservation


class ParkingSpotView(viewsets.ModelViewSet):
    serializer_class = ParkingSpotSerializer
    queryset = ParkingSpot.objects.all()


class ParkingSpotReservationView(viewsets.ModelViewSet):
    serializer_class = ParkingSpotReservationSerializer
    queryset = ParkingSpotReservation.objects.all()
