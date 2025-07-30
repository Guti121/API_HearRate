"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { urlBase } from "@/app/globalParams";
import { useParams, useRouter } from "next/navigation";
import PacienteEditForm from "@/app/PacienteEditForm";
const FrecuenciaLive = () => {
  const router = useRouter() 
  const params = useParams()
  const id = params.idx;
  const [formData, setFormData] = useState({});
  const [frecuencia, setFrecuencia] = useState(null);
  const [info,setInfo] = useState(null);
  const [editing, setEditing] = useState(false);
  const [message,setMessage] = useState(null)


  const getBeatSpeed = () => {
    if (frecuencia === null) return "animate-[beat_0.0s_ease-in-out_infinite]";
    if (frecuencia > 120) return "animate-[beat_0.4s_ease-in-out_infinite]";
    if (frecuencia < 60) return "animate-[beat_1.2s_ease-in-out_infinite]";
    return "animate-[beat_0.8s_ease-in-out_infinite]";
  };

  const handleRequest = async () =>{
    try{
        const token = localStorage.getItem("token")
        const request = await fetch(`${urlBase}pacientes/${id}/`,
          {
              headers:{
                "Authorization": `Token ${token}`,
                 "Content-Type": "application/json",
            },

          }
    )   
       const response = await request.json()
       console.log(response)
       setInfo(response)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/frecuencia/");
    handleRequest()
    socket.onopen = () => {
      console.log("📡 Conectado al WebSocket de frecuencia");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.error) {
          setFormData({
            mensaje: `❌ ${data.error}`,
            identificacion: data.identificacion || "N/A",
            frecuencia_cardiaca: null,
          });
          setFrecuencia(null);
        } else {
          setFormData(data);
          setFrecuencia(Number(data.frecuencia_cardiaca));
        }
      } catch (e) {
        console.error("❌ Error al parsear mensaje:", e);
      }
    };

    socket.onerror = (event) => {
      console.error("WebSocket Error:", event);
    };

    socket.onclose = () => {
      console.log("🚫 Conexión cerrada con WebSocket");
    };

    return () => socket.close();

  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-red-200 px-4">
      
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full border border-gray-200">
        { message && 
      <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          ¡{message}!  
      </h2>}
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          📈 Monitoreo de Frecuencia Cardíaca
        </h2>

        {/* Corazón animado */}
        <div className="flex justify-center mb-6 relative">
          <div className="absolute w-28 h-28 rounded-full bg-red-100 blur-xl animate-pulse"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={clsx("w-24 h-24 text-red-500 z-10", getBeatSpeed())}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
              2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 
              4.5 2.09C13.09 3.81 14.76 3 16.5 3 
              19.58 3 22 5.42 22 8.5c0 3.78-3.4 
              6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

      <div className="bg-gray-50 rounded-lg p-4 shadow-inner mb-6">
        <h3 className="text-lg font-semibold text-center mb-4 text-gray-700">📊 Datos en tiempo real</h3>
        <div className="space-y-3 text-sm text-gray-800">
          {Object.entries(formData).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between items-center px-2 py-1 border-b border-gray-200"
            >
              <span className="capitalize font-medium text-gray-600">{key.replace(/_/g, " ")}:</span>
              <span
                className={clsx("font-semibold", {
                  "text-red-600":
                    key === "frecuencia_cardiaca" &&
                    (value > info.maximo_frecuencia_cardiaca || value < info.minimo_frecuencia_cardiaca),
                  "text-green-600":
                    key === "frecuencia_cardiaca" &&
                    value >= info.minimo_frecuencia_cardiaca &&
                    value <= info.maximo_frecuencia_cardiaca,
                })}
              >
                {value ?? "No disponible"}
              </span>
            </div>
          ))}
        </div>
      </div>


      {!editing ? (
      <>
        <div className="space-y-2 text-sm text-gray-800">
          <strong className="text-2xl font-bold text-center text-black-600 mb-6">
            Información del paciente
          </strong>
          {info &&
            Object.entries(info).map(([key, value]) => (
              <p key={key}>
                <strong className="capitalize">{key.replace(/_/g, " ")}:</strong>{" "}
                <span>{value ?? "No disponible"}</span>
              </p>
            ))}
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded m-1"
          >
            Editar información
          </button>
          <button
            onClick={() => router.replace(`/reporte/${info.id}?name=${info.nombre_completo}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded m-1"
          >
            Crear reporte
          </button>
        </div>
      </>
    ) : (
      <PacienteEditForm
        initialData={info}
        onCancel={() => setEditing(false)}
        onSave={(updated) => {
          setInfo(updated.paciente);
          setEditing(false);
          setMessage(updated.message || "Información actualizada")
          setTimeout(()=>setMessage(null),3000)
        }}
      />
    )}

      </div>
    </div>
  );
};

export default FrecuenciaLive;
