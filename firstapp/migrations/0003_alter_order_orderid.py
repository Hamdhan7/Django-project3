# Generated by Django 4.2.1 on 2023-05-09 07:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('firstapp', '0002_alter_order_orderid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='orderid',
            field=models.AutoField(primary_key=True, serialize=False, unique=True),
        ),
    ]
