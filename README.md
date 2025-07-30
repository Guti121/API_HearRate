🫀 Heart Rate Monitoring API
This project is an API designed to monitor heart rate in real time using WebSockets, allowing continuous and dynamic tracking of patient vitals.

🧠 Overview
Built with Django REST Framework for the backend and React for the frontend.

Enables the registration of multiple patients, each associated with a wristband (device) to monitor their heart rate in real time.

Implements real-time communication via WebSockets to stream live heart rate data to the frontend.

When a patient's heart rate exceeds safe limits and is considered life-threatening, the system automatically sends an emergency SMS using the Twilio API to their emergency contact.

Emergency contacts can review the situation and log a report explaining the cause of the alert, which is then stored in the database for record-keeping and further analysis.

⚙️ Tech Stack
Backend: Django REST Framework

Frontend: React.js

Real-time Communication: Django Channels + WebSockets

Notifications: Twilio API (for sending SMS alerts)

✅ Features
Real-time heart rate monitoring

Patient and wristband registration

Emergency SMS alerts

Health incident reporting

RESTful API endpoints following best practices
