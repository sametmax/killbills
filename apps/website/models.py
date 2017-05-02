import uuid

from djmoney.models.fields import MoneyField

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class Currency(models.Model):
    CODE_CHOICES = (
        ("EUR", "Euros"),
        ("USD", "Dollars"),
    )
    code = models.CharField(primary_key=True, max_length=3, choices=CODE_CHOICES)
    symbol = models.CharField(max_length=1, null=True, blank=True)
    # TODO: currency full name

    @property
    def name(self):
        return self.get_code_display()

    @property
    def suffix(self):
        return self.symbol or self.code

    def __str__(self):
        return "{} - {}".format(self.name, self.suffix)


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
    owner = models.ForeignKey(User)


@receiver(post_save, sender=MoneyBook)
def moneybook_save(sender, instance, created, **kwargs):
    if created:
        instance.initial_balance.currency = instance.currency.code
        # force updates for subfields
        instance.initial_balance = instance.initial_balance
        instance.current_balance = instance.initial_balance
        instance.save()
