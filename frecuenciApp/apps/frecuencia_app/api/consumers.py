import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from apps.frecuencia_app.api.sendWhatssap import send_whatsapp_alert
from apps.frecuencia_app.models import PacienteModel, ReportePacienteModel

class FrecuenciaConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add("frecuencia_group", self.channel_name)

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("frecuencia_group", self.channel_name)

    async def receive(self, text_data):
        print("RECIBIDO:", text_data)
        data = json.loads(text_data)
        frecuencia = data.get("frecuencia_cardiaca")
        identificacion = data.get("identificacion_cc")

        if frecuencia and identificacion:
            paciente = await self.obtener_paciente(identificacion)

            if paciente:
                fuera_de_rango = frecuencia < paciente.minimo_frecuencia_cardiaca or frecuencia > paciente.maximo_frecuencia_cardiaca

                if fuera_de_rango:
                    mensaje = f"⚠️ Frecuencia alterada: {frecuencia} bpm para el paciente {paciente.nombre_completo}"
                    # Send WhatsApp alert
                    await database_sync_to_async(send_whatsapp_alert)(mensaje,paciente.telefono_emergencia1)
                    #await self.guardar_alerta(paciente, frecuencia)
                else:
                    mensaje = f"✅ Frecuencia normal: {frecuencia} bpm"

                await self.channel_layer.group_send(
                    "frecuencia_group",
                    {
                        "type": "enviar_frecuencia",
                        "mensaje": mensaje,
                        "frecuencia": frecuencia,
                        "identificacion": identificacion,
                    }
                )
            else:
                await self.send(text_data=json.dumps({
                    "error": "Paciente no encontrado"
                }))

    async def enviar_frecuencia(self, event):
        print("ENVIANDO AL FRONTEND:", event)
        await self.send(text_data=json.dumps({
            "mensaje": event["mensaje"],
            "frecuencia_cardiaca": event["frecuencia"],
            "identificacion": event["identificacion"],
        }))

    @database_sync_to_async
    def obtener_paciente(self, identificacion):
        try:
            return PacienteModel.objects.get(identificacion_cc=identificacion)
        except PacienteModel.DoesNotExist:
            return None

   # @database_sync_to_async
   # def guardar_alerta(self, paciente, frecuencia):
   #     ReportePacienteModel.objects.create(
   #         paciente=paciente,
   #         frecuencia_cardiaca=frecuencia,
   #         descripcion="Frecuencia fuera de rango"
   #     )
