'use client';

import { useEffect, useState } from 'react';
import { urlBase } from '@/app/globalParams';
import { useRouter } from 'next/navigation';

export default function ReporteComponent() {
  const [pacientes, setPacientes] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const fetchPacientes = async () => {
    try {
      const response = await fetch(`${urlBase}reporte/`, {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) throw new Error('Error al obtener pacientes');

      const data = await response.json();
      setPacientes(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (token) fetchPacientes();
  }, [token]);

  return (
    <div className="flex-1 p-4">
      {error && (
        <p className="bg-red-100 text-red-700 p-3 mb-4 rounded-md">
          {error}
        </p>
      )}

      <ul className="space-y-3">
        {pacientes.map((p, idx) => (
          <button
            onClick={() => router.push(`/reporte/detalle/${p.id}`)}
            key={idx}
            className="block w-full text-left p-4 bg-gray-100 rounded-md border-l-4 border-blue-500 hover:bg-gray-200 transition"
          >
            <strong>{p.nombre_paciente}</strong> — {p.frecuencia_cardiaca} lpm -{new Date(p.fecha).toLocaleString()
            } 
          </button>
        ))}
      </ul>
    </div>
  );
}
