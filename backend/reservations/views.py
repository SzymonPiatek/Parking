from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ParkingSpotSerializer
from .models import ParkingSpot


class ParkingSpotView(viewsets.ModelViewSet):
    serializer_class = ParkingSpotSerializer
    queryset = ParkingSpot.objects.all()
