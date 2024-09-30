from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from ..models.calonkaryawan_models import CalonKaryawan
from ..serializers import CalonKaryawanSerializer

class CalonKaryawanView(APIView):
    def get(self, request):
        candidate = CalonKaryawan.objects.all()
        serializer = CalonKaryawanSerializer(candidate, many = True)
        return Response(serializer.data)
    
class CalonKaryawanCreate(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        serializer = CalonKaryawanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Berhasil menambah data",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    
class CalonKaryawanUpdate(APIView):
    def put(self, request, *args, **kwargs):
        id = kwargs.get('id')
        candidate = get_object_or_404(CalonKaryawan, id=id)

        serializer = CalonKaryawanSerializer(candidate, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "Berhasil update data",
                "data" : serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "errors" : serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class CalonKaryawanDelete(APIView):
    def delete(self, request, *args, **kwargs):
        id = kwargs.get('id')
        candidate = get_object_or_404(CalonKaryawan, id=id)

        candidate.delete()
        return Response({
            "message" : "Berhasil menghapus data"
        }, status=status.HTTP_204_NO_CONTENT)