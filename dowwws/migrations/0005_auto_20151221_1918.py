# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dowwws', '0004_question_title'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderCount',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('productName', models.CharField(max_length=255)),
                ('count', models.IntegerField(default=0)),
            ],
        ),
        migrations.AddField(
            model_name='question',
            name='emailResponse',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='question',
            name='isAnswered',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='question',
            name='public',
            field=models.BooleanField(default=True),
        ),
    ]
