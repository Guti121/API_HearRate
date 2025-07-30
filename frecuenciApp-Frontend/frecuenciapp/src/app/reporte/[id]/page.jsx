"use client";

import { urlBase } from "@/app/globalParams";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ReporteCrear() {
  const searchParams = useSearchParams();
  const nombre = searchParams.get('name');
  const params = useParams();
  const idPaciente = params.id;
  const [message,setMessage] = useState(null)
  const [data, setData] = useState({
    paciente: idPaciente,
    frecuencia_cardiaca: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRequest = async() =>{
    try{
        const token = localStorage.getItem('token')
        const request = await fetch(`${urlBase}reporte/`,{
            method:'POST',
            headers:{
                'Authorization':`Token ${token}`,
                'Content-Type': 'application/json'
            },body :JSON.stringify(data)
        })
        const response = await request.json()
        console.log(response)
        setMessage(response.message|| "¡Reporte creado exitosamente!")
        setTimeout(()=>setMessage(null),3000)
        setData({
          paciente: idPaciente,
          frecuencia_cardiaca: "",
          descripcion: "",})
    }catch(error){
        console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", data);

    handleRequest()
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-xl font-bold mb-4 text-green-600 ">{message}</h2>
        
      <h2 className="text-xl font-bold mb-4">Generar Reporte</h2>
      <h2 className="text-xl mb-4 text-blue-700">{nombre}</h2>
      

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Frecuencia Cardíaca</label>
          <input
            type="number"
            name="frecuencia_cardiaca"
            value={data.frecuencia_cardiaca}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            name="descripcion"
            value={data.descripcion}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            rows="3"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
