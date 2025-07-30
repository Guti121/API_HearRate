# apps/frecuencia_app/views.py
from xmlrpc.client import APPLICATION_ERROR
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from apps.frecuencia_app.api.serializer.seralizers import PacienteSerializer, ReporteSerializer
from apps.frecuencia_app.models import PacienteModel, ReportePacienteModel

#Vista para crear y obtener la lista de pacientes
class PacienteListCreateView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        pacientes = PacienteModel.objects.all()
        serializer = PacienteSerializer(pacientes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PacienteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Vista para obtener un paciente por id , eliminar por id y actualizar por id 
class PacienteDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        paciente = get_object_or_404(PacienteModel, id=id)
        serializer = PacienteSerializer(paciente)
        return Response(serializer.data)
    
    def delete(self, request, id):
        paciente = get_object_or_404(PacienteModel, id=id)
        paciente.delete()
        return Response({"message": "Paciente eliminado correctamente."}, status=status.HTTP_204_NO_CONTENT)
    
    def put(self,request,id):
        paciente = get_object_or_404(PacienteModel,id=id)
        serializer= PacienteSerializer(paciente , data = request.data ,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Paciente actualizado parcialmente.", "paciente": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
#Vista para crear y obtener la lista de pacientes
class ReportePacienteView(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]

    def get(self,request):
        reporte=ReportePacienteModel.objects.all()
        serializer=ReporteSerializer(reporte, many = True)
        return Response(serializer.data)
    
    def post (self,request):
        serializer=ReporteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

#Vista para obtener un paciente por id , eliminar por id y actualizar por id 
class ReportePacienteDetailView(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]

    def get(self, request, id):
        reporte = get_object_or_404(ReportePacienteModel, id=id)
        serializer = ReporteSerializer(reporte)
        return Response(serializer.data)
    
    def delete(self, request, id):
        reporte = get_object_or_404(ReportePacienteModel, id=id)
        reporte.delete()
        return Response({"message": "reporte eliminado correctamente."}, status=status.HTTP_204_NO_CONTENT)
    
    def put(self,request,id):
        reporte = get_object_or_404(ReportePacienteModel,id=id)
        serializer= ReporteSerializer(reporte , data = request.data ,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "reporte actualizado parcialmente.", "reporte": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        