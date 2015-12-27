# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dowwws', '0002_auto_20151103_2111'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='answer',
            field=models.TextField(default=b'Not answered yet'),
        ),
    ]
