from django.contrib import admin

from website.models import Currency, MoneyBook


class MoneyBookAdmin(admin.ModelAdmin):
    list_display = ('name', 'currency', 'balance', 'owner')


admin.site.register(Currency)
admin.site.register(MoneyBook, MoneyBookAdmin)
