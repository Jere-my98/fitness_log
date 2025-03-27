# Generated by Django 5.1.7 on 2025-03-22 22:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("workout", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Tag",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=40)),
            ],
        ),
        migrations.AddField(
            model_name="workout",
            name="tag",
            field=models.ForeignKey(
                null=True, on_delete=django.db.models.deletion.CASCADE, to="workout.tag"
            ),
        ),
    ]
