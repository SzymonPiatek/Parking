# Generated by Django 5.0.6 on 2024-05-16 05:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reservations', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='parkingspot',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='parkingspot',
            name='name',
            field=models.CharField(max_length=5, unique=True),
        ),
    ]
