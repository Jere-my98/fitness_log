# Generated by Django 5.1.7 on 2025-03-07 06:17

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("userprofile", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="userprofile",
            options={},
        ),
        migrations.AlterModelManagers(
            name="userprofile",
            managers=[],
        ),
        migrations.RemoveField(
            model_name="userprofile",
            name="date_joined",
        ),
        migrations.RemoveField(
            model_name="userprofile",
            name="email",
        ),
        migrations.RemoveField(
            model_name="userprofile",
            name="first_name",
        ),
        migrations.RemoveField(
            model_name="userprofile",
            name="groups",
        ),
        migrations.RemoveField(
            model_name="userprofile",
            name="is_active",
        ),
        migrations.RemoveField(
            model_name="userprofile",
            name="is_staff",
        ),
        migrations.RemoveField(
            model_name="userprofile",
            name="is_superuser",
        ),
        migrations.RemoveField(
            model_name="userprofile",
            name="last_login",
        ),
        migrations.RemoveField(
            model_name="userprofile",
            name="last_name",
        ),
        migrations.RemoveField(
            model_name="userprofile",
            name="password",
        ),
        migrations.RemoveField(
            model_name="userprofile",
            name="user_permissions",
        ),
        migrations.RemoveField(
            model_name="userprofile",
            name="username",
        ),
        migrations.AddField(
            model_name="userprofile",
            name="user",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
