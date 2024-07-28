from django.contrib import admin
from userauths.models import Profile, User


class UserAdmin(admin.ModelAdmin):
    search_fields = ['full_name', 'username', 'email', 'phone']
    list_display = ['full_name', 'email', 'phone']

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['thumbnail', 'user', 'full_name']
    # list_editable = ['gender', 'country']
    search_fields = ['user']
    # list_filter = ['date']


admin.site.register(User)
admin.site.register(Profile)
