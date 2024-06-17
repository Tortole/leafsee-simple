# Generated by Django 5.0.4 on 2024-06-11 09:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("videos", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="video",
            name="description",
            field=models.TextField(blank=True, max_length=5000),
        ),
        migrations.AlterField(
            model_name="video",
            name="duration",
            field=models.DurationField(blank=True),
        ),
        migrations.AlterField(
            model_name="video",
            name="preview_image",
            field=models.ImageField(blank=True, upload_to=""),
        ),
    ]
