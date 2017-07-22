from collections import OrderedDict

from website.models import Currency, MoneyBook

from rest_framework import serializers


class AsymetricRelatedField(serializers.PrimaryKeyRelatedField):

    def to_representation(self, value):
        return self.serializer_class.serializer_class(value).data

    def get_queryset(self):
        if self.queryset:
            return self.queryset
        return self.serializer_class.serializer_class.Meta.model.objects.all()

    def get_choices(self, cutoff=None):
        queryset = self.get_queryset()
        if queryset is None:
            return {}

        if cutoff is not None:
            queryset = queryset[:cutoff]

        return OrderedDict([
            (
                item.pk,
                self.display_value(item)
            )
            for item in queryset
        ])

    def use_pk_only_optimization(self):
        return False

    @classmethod
    def from_serializer(cls, serializer, name=None, args=(), kwargs={}):
        if name is None:
            name = f"{serializer.__class__.__name__}AsymetricAutoField"

        return type(name, (cls,), {"serializer_class": serializer})


class CurrencySerializer(serializers.ModelSerializer):

    class Meta:
        model = Currency
        fields = ('code', 'symbol', 'name', 'suffix')


class CurrencyField(AsymetricRelatedField):
    serializer_class = AsymetricRelatedField.from_serializer(CurrencySerializer)


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
