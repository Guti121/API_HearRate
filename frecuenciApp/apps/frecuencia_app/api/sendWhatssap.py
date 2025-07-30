# utils/whatsapp.py
from twilio.rest import Client
import os

def send_whatsapp_alert(message: str,number):

    account_sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")

    client = Client(account_sid, auth_token)

    client.messages.create(
        body=message,
        from_='whatsapp:+14155238886',  # Twilio sandbox number
        to=f'whatsapp:+57{number}'      # Your recipient's WhatsApp number
    )
