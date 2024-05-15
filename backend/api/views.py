from django.core.serializers import serialize
from django.http import JsonResponse
from reservations.models import ParkingSpot


def parking_spots(request):
    parking_spots = ParkingSpot.objects.all()
    parking_spots_json = serialize('json', parking_spots)
    return JsonResponse(parking_spots_json, safe=False)
