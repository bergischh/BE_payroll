from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from ..models import Tunjangan
from ..serializers import TunjanganSerializer

class TunjanganView(APIView):
    def get(selft, request):
        allowance = Tunjangan.objects.all()
        serializer = TunjanganSerializer(allowance, many = True)
        return Response(serializer.data)
    
class TunjanganCreate(APIView):
    def post(self, request):
        serializer = TunjanganSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Berhasil menambah data",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
        
class TunjanganUpdate(APIView):
    def put(self, request, *args, **kwargs):
        id = kwargs.get('id')
        allowance = get_object_or_404(Tunjangan, id=id)

        serializer = TunjanganSerializer(allowance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "Berhasil update data",
                "data" : serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "errors" : serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class TunjanganDelete(APIView):
    def delete(self, request, *args, **kwargs):
        id = kwargs.get('id')
        allowance = get_object_or_404(Tunjangan, id=id)

        allowance.delete()
        return Response({
            "message" : "Berhasil menghapus data"
        }, status=status.HTTP_204_NO_CONTENT)
    