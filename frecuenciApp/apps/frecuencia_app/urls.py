# apps/frecuencia_app/urls.py
from django.urls import path

from apps.frecuencia_app.api.view.loginView import AdminLoginView
from apps.frecuencia_app.api.view.pacienteView import PacienteDetailView, PacienteListCreateView, ReportePacienteDetailView, ReportePacienteView


urlpatterns = [
    path('reporte/', ReportePacienteView().as_view(), name='reporte-list-create'),
    path('reporte/<int:id>/', ReportePacienteDetailView().as_view(), name='reporte-detail'),
    path('pacientes/', PacienteListCreateView.as_view(), name='paciente-list-create'),
    path('pacientes/<int:id>/', PacienteDetailView.as_view(), name='paciente-detail'),
    path('login/', AdminLoginView().as_view(), name='admin-login'),

]
