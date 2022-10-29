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
        queries = request.query_params
        if len(queries):
            if 'search_query' in queries and len(queries['search_query']) >= 3:
                self.queryset = self.queryset.filter(title__icontains=queries['search_query']).values()
            if 'program_type' in queries and queries['program_type']:
                self.queryset = self.queryset.filter(program_type=queries['program_type'])
            if 'order_by' in queries and len(queries['order_by']):
                self.queryset = self.queryset.order_by(queries['order_by'])
            # else:
            #     self.queryset = self.queryset.order_by('?')
            if len(self.queryset.values()):
                response = {'results': self.queryset.values()[:30], 'message': SUCCESS_DATA_FETCH_MESSAGE}
                return Response(response, status=status.HTTP_200_OK)
            else:
                response = {'results': self.queryset.values(), 'message': NO_DATA_FETCH_MESSAGE}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        self.queryset = self.queryset.filter(release_year__gte=2010).order_by('title')
        response = {'results': self.queryset.values()[:30], 'message': SUCCESS_DATA_FETCH_MESSAGE}
        return Response(response, status=status.HTTP_200_OK)
