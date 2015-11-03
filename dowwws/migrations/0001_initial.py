# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GameGeadsnre',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('genre', models.CharField(unique=True, max_length=255)),
                ('desc', models.TextField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='GameGenre',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('genre', models.CharField(unique=True, max_length=255)),
                ('desc', models.TextField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('clientName', models.CharField(max_length=255)),
                ('clientEmail', models.CharField(max_length=255)),
                ('question', models.TextField()),
                ('postDate', models.DateField(auto_now_add=True)),
                ('isPublished', models.BooleanField(default=False)),
            ],
        ),
    ]
