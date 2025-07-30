# apps/frecuencia_app/serializers.py
from rest_framework import serializers

from apps.frecuencia_app.models import PacienteModel, ReportePacienteModel

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PacienteModel
        fields = '__all__'


class ReporteSerializer(serializers.ModelSerializer):
    nombre_paciente = serializers.CharField(source='paciente.nombre_completo', read_only=True)

    class Meta:
        model = ReportePacienteModel
        fields = '__all__'
        # Or manually: ['id', 'paciente', 'nombre_paciente', 'frecuencia_cardiaca', 'descripcion', 'fecha']
