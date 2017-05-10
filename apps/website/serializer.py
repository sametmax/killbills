from website.models import Currency, MoneyBook

from rest_framework import serializers


class AsymetricRelatedField(serializers.PrimaryKeyRelatedField):

    def to_representation(self, value):
        return self.serializer_class(value).data

    def get_queryset(self):
        if self.queryset:
            return self.queryset
        return self.serializer_class.Meta.model.objects.all()

    def use_pk_only_optimization(self):
        return False


class CurrencySerializer(serializers.ModelSerializer):

    class Meta:
        model = Currency
        fields = ('code', 'symbol', 'name', 'suffix')


class CurrencyField(AsymetricRelatedField):
    serializer_class = CurrencySerializer


class MoneyBookSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    currency = CurrencyField()

    class Meta:
        model = MoneyBook
        fields = ('id', 'name', 'currency', 'balance', 'owner')

    def validate_owner(self, value):
        user = self.context['request'].user
        if not value and user:
            return user
        return value
