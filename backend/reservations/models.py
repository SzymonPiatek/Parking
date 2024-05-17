from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from datetime import datetime, timedelta


class ParkingSpot(models.Model):
    name = models.CharField(max_length=5, unique=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class ParkingSpotReservation(models.Model):
    item = models.ForeignKey(ParkingSpot, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    constant = models.BooleanField(null=False)
    start_date = models.DateTimeField(null=True)
    end_date = models.DateTimeField(null=True)

    def __str__(self):
        if self.constant:
            return f"Stała rezerwacja {self.item}"
        else:
            return f"Rezerwacja {self.item} od {self.start_date} do {self.end_date} - {self.user}"

    def save(self, *args, **kwargs):
        if self.constant:
            self.start_date = datetime.now()
            self.end_date = self.start_date + timedelta(days=365*100)
        else:
            if not self.start_date or not self.end_date:
                raise ValidationError("Określ rodzaj rezerwacji lub podaj jej zakres dat")
        super().save(*args, **kwargs)

    def remaining_time(self):
        now = datetime.now()
        formatted_now = now.strftime("%d/%m/%Y %H:%M")

        if self.constant:
            return "Miejsce stałe"
        elif self.end_date > formatted_now:
            return self.end_date - formatted_now
        else:
            return "Przedawniona rezerwacja"
