
# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.constants import *
from api.models import Movies


class MoviesView(APIView):
    model = Movies
    queryset = Movies.objects.all()

    def get(self, request):
        # queryset = self.model.objects.filter()
        # serializer = self.serializer(queryset, many=True)
        data = self.queryset.filter(release_year__gte=2010).order_by('title').values()[:30]
        response = {'results': data, 'count': len(data), 'message': SUCCESS_DATA_FETCH_MESSAGE}
        return Response(response, status=status.HTTP_200_OK)
