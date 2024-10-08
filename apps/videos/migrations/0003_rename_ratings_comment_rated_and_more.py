# Generated by Django 5.0.4 on 2024-08-07 04:06

import apps.videos.models
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("videos", "0002_alter_video_description_alter_video_duration_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="comment",
            old_name="ratings",
            new_name="rated",
        ),
        migrations.RenameField(
            model_name="video",
            old_name="rated_views",
            new_name="auth_viewers",
        ),
        migrations.AlterField(
            model_name="commentrating",
            name="comment",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="ratings",
                to="videos.comment",
            ),
        ),
        migrations.AlterField(
            model_name="video",
            name="file",
            field=models.FileField(upload_to=apps.videos.models.generate_video_path),
        ),
        migrations.AlterField(
            model_name="video",
            name="preview_image",
            field=models.ImageField(
                blank=True, upload_to=apps.videos.models.generate_preview_path
            ),
        ),
        migrations.AlterField(
            model_name="videoratedviews",
            name="video",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="rated_views",
                to="videos.video",
            ),
        ),
    ]
