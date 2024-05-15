from django.db import models
from datetime import datetime


class ParkingSpot(models.Model):
    name = models.CharField(max_length=5)
    description = models.TextField()

    def __str__(self):
        return self.name


class ParkingSpotReservation(models.Model):
    item = models.ForeignKey(ParkingSpot, on_delete=models.CASCADE)
    constant = models.BooleanField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    def __str__(self):
        if self.constant:
            return f"Stała rezerwacja {self.item}"
        else:
            return f"Rezerwacja {self.item} od {self.start_date} do {self.end_date}"

    def remaining_time(self):
        now = datetime.now()
        formatted_now = now.strftime("%d/%m/%Y %H:%M")

        if self.end_date > formatted_now:
            return self.end_date - formatted_now
        else:
            return "Przedawniona rezerwacja"
