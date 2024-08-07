# Generated by Django 5.0.3 on 2024-08-05 15:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='total',
            field=models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=12, null=True),
        ),
        migrations.AddField(
            model_name='cartorder',
            name='tax_fee',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12),
        ),
    ]
