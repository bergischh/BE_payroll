from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from ..models.pinjaman_models import Pinjaman
from ..serializers import PinjamanSerializer

class PinjamanView(APIView):
    def get(self, request):
        loan = Pinjaman.objects.all()
        serializer = PinjamanSerializer(loan, many = True)
        return Response(serializer.data)
    
class PinjamanCreate(APIView):
    def post(self, request):
        serializer = PinjamanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Berhasil menambah data",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class PinjamanUpdate(APIView):
   def put(self, request, *args, **kwargs):
        id = kwargs.get('id')
        loan = get_object_or_404(Pinjaman, id=id)

        serializer = PinjamanSerializer(loan, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "Berhasil update data",
                "data" : serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "errors" : serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
   
class PinjamanDelete(APIView):
    def delete(self, request, *args, **kwargs):
        id = kwargs.get('id')
        loan = get_object_or_404(Pinjaman, id=id)

        loan.delete()
        return Response({
            "message" : "Berhasil menghapus data"
        }, status=status.HTTP_204_NO_CONTENT)