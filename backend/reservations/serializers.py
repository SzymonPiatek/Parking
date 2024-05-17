from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ParkingSpot, ParkingSpotReservation


class ParkingSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSpot
        fields = ('id', 'name', 'description')


class ParkingSpotReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSpotReservation
        fields = ('id', 'item', 'user', 'constant', 'start_date', 'end_date')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
