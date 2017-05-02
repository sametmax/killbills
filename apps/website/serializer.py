from website.models import Currency, MoneyBook

from rest_framework import serializers


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ('code', 'symbol', 'name', 'suffix')


class MoneyBookSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    currency = CurrencySerializer()

    class Meta:
        model = MoneyBook
        fields = ('id', 'name', 'currency', 'current_balance', 'owner')
