from website.models import Currency, MoneyBook

from rest_framework import serializers


class CurrencySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Currency
        fields = ('id', 'code', 'symbol', 'name', 'suffix')


class MoneyBookSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MoneyBook
        fields = ('id', 'name', 'inital_balance', 'current_balance', 'owner')

