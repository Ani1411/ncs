from django.urls import path

from api import views

urlpatterns = [
    path('programs', views.MoviesView.as_view(), name="movies-list")
]
