🫀 Heart Rate Monitoring API
This project is an API designed to monitor heart rate in real time using WebSockets, allowing continuous and dynamic tracking of patient vitals.

🧠 Overview
Heart rate data is captured through an ESP32 microcontroller connected to a heart rate sensor.

The ESP32 sends this data in real time to the server via WebSockets.

The backend, built with Django REST Framework, receives and processes this data.

The frontend, developed in React.js, displays the measurements live to users.

Enables registration of multiple patients, each linked to a wristband (ESP32 + sensor), allowing them to be monitored individually.

If a patient's heart rate exceeds safe thresholds and is considered life-threatening, the system triggers an emergency SMS via the Twilio API to alert their emergency contact.

Emergency contacts can review the situation and submit a report explaining the cause of the alert, which is stored in the database for future reference.

⚙️ Tech Stack
Hardware: ESP32 + Heart Rate Sensor

Backend: Django REST Framework

Frontend: React.js

Real-time Communication: Django Channels + WebSockets

Notifications: Twilio API (SMS alerts)

✅ Features
Real-time heart rate monitoring from ESP32

WebSocket communication for live data transfer

Patient and wristband/device registration

Emergency SMS alerts when heart rate is abnormal

Incident reporting system

RESTful API endpoints following best practices
