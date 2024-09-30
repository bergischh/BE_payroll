from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from ..models.periode_models import PeriodeGaji
from ..serializers import PeriodeSerializer


class PeriodeView(APIView):
    def get(self, request):
        periode= PeriodeGaji.objects.all()
        serializer = PeriodeSerializer(periode, many = True)
        return Response(serializer.data)
    
class PeriodeCreate(APIView):
    def post(self, request):
        serializer = PeriodeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Berhasil menambah data",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class PeriodeUpdate(APIView):
    def put(self, request, *args, **kwargs):
        id = kwargs.get('id')
        periode= get_object_or_404(PeriodeGaji, id=id)

        serializer = PeriodeSerializer(periode, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "Berhasil update data",
                "data" : serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "errors" : serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class PeriodeDelete(APIView):
    def delete(self, request, *args, **kwargs):
        id = kwargs.get('id')
        periode= get_object_or_404(PeriodeGaji, id=id)

        periode.delete()
        return Response({
            "message" : "Berhasil menghapus data"
        }, status=status.HTTP_204_NO_CONTENT)

    

