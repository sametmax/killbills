import uuid

from djmoney.models.fields import MoneyField

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Currency(models.Model):
    CODE_CHOICES = (
        ("EUR", "Euros"),
        ("USD", "Dollars"),
    )

    code = models.CharField(
        primary_key=True, max_length=3, choices=CODE_CHOICES
    )
    symbol = models.CharField(max_length=1, null=True, blank=True)

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
    balance = MoneyField(
        max_digits=14,
        decimal_places=2,
        default_currency='USD',
        default=0
    )
    owner = models.ForeignKey(User)


@receiver(post_save, sender=MoneyBook)
def moneybook_save(sender, instance, created, **kwargs):
    if created:
        instance.balance.currency = instance.currency.code
        # force updates for subfields
        instance.save()
