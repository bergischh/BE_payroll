from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from ..models.slipgaji_models import SlipGaji
from ..serializers import SlipGajiSerializer

class SlipGajiView(APIView):
    def get(self, request):
        departments = SlipGaji.objects.all()
        serializer = SlipGajiSerializer(departments, many = True)
        return Response(serializer.data)
    
class SlipGajiCreate(APIView):
    def post(self, request):
        serializer = SlipGajiSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Berhasil menambah data",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class SlipGajiUpdate(APIView):
    def put(self, request, *args, **kwargs):
        id = kwargs.get('id')
        departments = get_object_or_404(SlipGaji, id=id)

        serializer = SlipGajiSerializer(departments, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "Berhasil update data",
                "data" : serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "errors" : serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class SlipGajiDelete(APIView):
    def delete(self, request, *args, **kwargs):
        id = kwargs.get('id')
        departments = get_object_or_404(SlipGaji, id=id)

        departments.delete()
        return Response({
            "message" : "Berhasil menghapus data"
        }, status=status.HTTP_204_NO_CONTENT)