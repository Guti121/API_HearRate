# Generated by Django 5.2.4 on 2025-07-23 21:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PacienteModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('identificacion_cc', models.IntegerField(unique=True)),
                ('nombre_completo', models.CharField(max_length=100)),
                ('minimo_frecuencia_cardiaca', models.IntegerField()),
                ('maximo_frecuencia_cardiaca', models.IntegerField()),
                ('direccion_de_residencia', models.CharField(max_length=100)),
                ('telefono_residencia', models.IntegerField()),
                ('telefono_emergencia1', models.IntegerField()),
                ('telefono_emergencia2', models.IntegerField()),
                ('correo', models.EmailField(max_length=100)),
                ('eps', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='ReportePacienteModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('frecuencia_cardiaca', models.IntegerField()),
                ('descripcion', models.CharField(max_length=500)),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('paciente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='frecuencia_app.pacientemodel')),
            ],
        ),
    ]
