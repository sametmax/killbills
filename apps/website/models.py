import uuid

from djmoney.models.fields import MoneyField

from django.db import models


# Create your models here.
class Currency(models.Model):
    CODE_CHOICES = (
        ("EUR", "€"),
        ("USD", "$"),
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.CharField(max_length=3, choices=CODE_CHOICES)
    # TODO: currency full name


class MoneyBook(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=32)
    currency = models.ForeignKey(Currency)
    initial_balance = MoneyField(
        max_digits=12,
        decimal_places=2,
        default_currency='USD',
        default=0
    )
    current_balance = MoneyField(
        max_digits=12,
        decimal_places=2,
        default_currency='USD',
        default=0
    )
