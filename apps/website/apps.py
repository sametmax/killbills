from django.apps import AppConfig


class WebsiteConfig(AppConfig):
    name = 'website'

    def ready(self):
        Currency = self.get_model("Currency")
        Currency.objects.get_or_create(code="EUR", symbol="€")
        Currency.objects.get_or_create(code="USD", symbol="$")
