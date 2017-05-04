from website.models import Currency, MoneyBook

from rest_framework import serializers


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ('code', 'symbol', 'name', 'suffix')


class ReadOnlyMoneyBookSerializer(serializers.ModelSerializer):

    currency = CurrencySerializer()

    class Meta:
        model = MoneyBook
        fields = ('id', 'name', 'currency', 'balance', 'owner')


class MoneyBookSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = MoneyBook
        fields = ('id', 'name', 'currency', 'balance', 'owner')

    def validate_owner(self, value):
        user = self.context['request'].user
        if not value and user:
            return user
        return value
