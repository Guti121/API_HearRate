from django.db import models

class PacienteModel(models.Model):
    identificacion_cc = models.IntegerField(blank=False, unique=True)
    nombre_completo = models.CharField(max_length=100, blank=False)
    minimo_frecuencia_cardiaca = models.IntegerField(blank=False)
    maximo_frecuencia_cardiaca = models.IntegerField(blank=False)
    direccion_de_residencia = models.CharField(max_length=100, blank=False)
    telefono_residencia = models.IntegerField(blank=False)
    telefono_emergencia1 = models.IntegerField(blank=False)
    telefono_emergencia2 = models.IntegerField(blank=False)
    correo = models.EmailField(max_length=100, blank=False)
    eps = models.CharField(max_length=100, blank=False)

    def __str__(self):
        return f"{self.nombre_completo} - {self.identificacion_cc}"

class ReportePacienteModel(models.Model):
    paciente = models.ForeignKey(PacienteModel, on_delete=models.CASCADE)
    frecuencia_cardiaca = models.IntegerField(blank=False)
    descripcion = models.CharField(max_length=500, blank=False)
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reporte de {self.paciente.nombre_completo} - {self.frecuencia_cardiaca} BPM"
