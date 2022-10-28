from django.db import models

# Create your models here.


class Movies(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    program_type = models.CharField(max_length=20)
    poster_art_url = models.URLField(max_length=200)
    poster_art_width = models.FloatField()
    poster_art_height = models.FloatField()
    release_year = models.FloatField()

    objects = models.Manager()

    class Meta:
        db_table = 'movies'
        verbose_name = 'movie'
        verbose_name_plural = 'movies'

    def __str__(self):
        return str(self.title)
