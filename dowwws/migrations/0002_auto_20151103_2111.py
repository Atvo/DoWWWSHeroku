# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dowwws', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='GameGeadsnre',
        ),
        migrations.DeleteModel(
            name='GameGenre',
        ),
        migrations.RenameField(
            model_name='question',
            old_name='clientEmail',
            new_name='email',
        ),
        migrations.RenameField(
            model_name='question',
            old_name='question',
            new_name='message',
        ),
        migrations.RenameField(
            model_name='question',
            old_name='clientName',
            new_name='name',
        ),
    ]
