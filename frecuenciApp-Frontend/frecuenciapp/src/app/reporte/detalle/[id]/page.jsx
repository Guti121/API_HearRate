"use client"

import { urlBase } from "@/app/globalParams"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ReporteDetalle() {
  const params = useParams()
  const router = useRouter()
  const id = params.id
  const [reporte, setReporte] = useState(null)

  const handleRequest = async () => {
    try {
      const token = localStorage.getItem("token")
      const request = await fetch(`${urlBase}reporte/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      })

      const response = await request.json()
      setReporte(response)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${urlBase}reporte/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      })

      if (res.status === 204) {
        alert("Reporte eliminado correctamente.")
        router.push("/usuario") 
      } else {
        alert("Error al eliminar el reporte.")
      }
    } catch (error) {
      console.log(error)
      alert("Error al eliminar.")
    }
  }

  useEffect(() => {
    handleRequest()
  }, [])

  if (!reporte) {
    return <p className="text-center text-gray-500 mt-8">Cargando reporte...</p>
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6 space-y-4">
      <h2 className="text-2xl font-bold text-blue-700">Detalle del Reporte</h2>

      <p>
        <span className="font-semibold">Nombre del paciente:</span>{" "}
        {reporte.nombre_paciente}
      </p>
      <p>
        <span className="font-semibold">Frecuencia cardiaca:</span>{" "}
        {reporte.frecuencia_cardiaca} BPM
      </p>
      <p>
        <span className="font-semibold">Descripción:</span>{" "}
        {reporte.descripcion}
      </p>
      <p>
        <span className="font-semibold">Fecha:</span>{" "}
        {new Date(reporte.fecha).toLocaleString()}
      </p>

      <button
        onClick={handleDelete}
        className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
      >
        Eliminar reporte
      </button>
    </div>
  )
}
