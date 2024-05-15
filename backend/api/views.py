from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from reservations.models import ParkingSpot, ParkingSpotReservation


@api_view(['GET'])
def home_page(request):
    return Response({
        "page_title" : "Strona główna"
        })
