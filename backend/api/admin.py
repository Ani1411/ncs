from django.contrib import admin

# Register your models here.
from api.models import Movies


class MovieAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "program_type", "poster_art_url", "poster_art_width", "poster_art_height",
                    "release_year",)


admin.site.register(Movies, MovieAdmin)
