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
            if 'search_query' in queries and queries['search_query']:
                self.queryset = self.queryset.filter(title__icontains=queries['search_query']).values()
            if 'program_type' in queries and queries['program_type']:
                self.queryset = self.queryset.filter(program_type=queries['program_type'])
            if 'order_by' in queries and len(queries['order_by']):
                self.queryset = self.queryset.order_by(queries['order_by'])
            if len(self.queryset.values()):
                response = {'results': self.queryset.values()[:30], 'message': SUCCESS_DATA_FETCH_MESSAGE}
                return Response(response, status=status.HTTP_200_OK)
            else:
                response = {'results': self.queryset.values(),
                            'message': f"No data found with the title: {queries['search_query']} and given filters"}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        queryset = self.queryset.filter(release_year__gte=2010).order_by('title').values()[:30]
        response = {'results': queryset, 'message': SUCCESS_DATA_FETCH_MESSAGE}
        return Response(response, status=status.HTTP_200_OK)
