from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from ..models.laporangaji_models import LaporanGaji
from ..serializers import LaporanSerializer

class LaporanGajiView(APIView):
    def get(self, request):
        report = LaporanGaji.objects.all()
        serializer = LaporanSerializer(report, many = True)
        return Response(serializer.data)

class LaporanGajiCreate(APIView):
    def post(self, request):
        serializer = LaporanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Berhasil menambah data",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class LaporanGajiUpdate(APIView):
    def put(self, request, *args, **kwargs):
        id = kwargs.get('id')
        report = get_object_or_404(LaporanGaji, id=id)

        serializer = LaporanSerializer(report, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "Berhasil update data",
                "data" : serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "errors" : serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class LaporanGajiDelete(APIView):
    def delete(self, request, *args, **kwargs):
        id = kwargs.get('id')
        report = get_object_or_404(LaporanGaji, id=id)

        report.delete()
        return Response({
            "message" : "Berhasil menghapus data"
        }, status=status.HTTP_204_NO_CONTENT)