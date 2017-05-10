
import warnings

from django.apps import AppConfig
from django.db.utils import OperationalError


class WebsiteConfig(AppConfig):
    name = 'website'

    def ready(self):
        Currency = self.get_model("Currency")

        try:
            Currency.objects.get_or_create(code="EUR", symbol="€")
            Currency.objects.get_or_create(code="USD", symbol="$")
        except OperationalError as e:
            warnings.warn(str(e))
