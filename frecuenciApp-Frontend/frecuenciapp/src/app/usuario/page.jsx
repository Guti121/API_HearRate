'use client';

import { useEffect, useState } from 'react';
import { urlBase } from '@/app/globalParams';
import { useRouter } from 'next/navigation';
import ReporteComponent from '../reporte/reporteList';

export default function PacienteComponent() {
  const [pacientes, setPacientes] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [activeTab, setActiveTab] = useState('usuarios');
  const router = useRouter();

  const [nuevoPaciente, setNuevoPaciente] = useState({
    identificacion_cc: '',
    nombre_completo: '',
    minimo_frecuencia_cardiaca: '',
    maximo_frecuencia_cardiaca: '',
    direccion_de_residencia: '',
    telefono_residencia: '',
    telefono_emergencia1: '',
    telefono_emergencia2: '',
    correo: '',
    eps: '',
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const fetchPacientes = async () => {
    try {
      const response = await fetch(`${urlBase}pacientes/`, {
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

  const handleChange = (e) => {
    setNuevoPaciente({
      ...nuevoPaciente,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${urlBase}pacientes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(nuevoPaciente),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(JSON.stringify(errData));
      }

      setNuevoPaciente({
        identificacion_cc: '',
        nombre_completo: '',
        minimo_frecuencia_cardiaca: '',
        maximo_frecuencia_cardiaca: '',
        direccion_de_residencia: '',
        telefono_residencia: '',
        telefono_emergencia1: '',
        telefono_emergencia2: '',
        correo: '',
        eps: '',
      });

      setMostrarFormulario(false);
      fetchPacientes();
    } catch (err) {
      setError(`Error al crear paciente: ${err.message}`);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto font-sans bg-white rounded-xl shadow-md">
      {/* Nav Bar */}
      <div className="flex justify-around mb-6 border-b-2 pb-2">
        {['usuarios', 'reportes'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 font-bold text-white rounded-md mx-1 ${
              activeTab === tab ? 'bg-blue-600' : 'bg-gray-400'
            }`}
          >
            {tab === 'usuarios' ? 'Usuarios' : 'Reportes'}
          </button>
        ))}
      </div>

      {/* Usuarios Tab */}
      {activeTab === 'usuarios' && (
        <>
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className={`w-full mb-4 font-bold text-white py-2 rounded-md ${
              mostrarFormulario ? 'bg-red-600' : 'bg-blue-600'
            }`}
          >
            {mostrarFormulario ? '✖ Cancelar' : '➕ Agregar Paciente'}
          </button>

          {mostrarFormulario && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
              {[
                { name: 'identificacion_cc', label: 'Identificación CC', type: 'number' },
                { name: 'nombre_completo', label: 'Nombre Completo' },
                { name: 'minimo_frecuencia_cardiaca', label: 'Mín. Frecuencia Cardíaca', type: 'number' },
                { name: 'maximo_frecuencia_cardiaca', label: 'Máx. Frecuencia Cardíaca', type: 'number' },
                { name: 'direccion_de_residencia', label: 'Dirección de Residencia' },
                { name: 'telefono_residencia', label: 'Teléfono Residencia', type: 'number' },
                { name: 'telefono_emergencia1', label: 'Teléfono Emergencia 1', type: 'number' },
                { name: 'telefono_emergencia2', label: 'Teléfono Emergencia 2', type: 'number' },
                { name: 'correo', label: 'Correo', type: 'email' },
                { name: 'eps', label: 'EPS' },
              ].map(({ name, label, type = 'text' }) => (
                <input
                  key={name}
                  name={name}
                  type={type}
                  value={nuevoPaciente[name]}
                  onChange={handleChange}
                  placeholder={label}
                  required
                  className="p-2 border border-gray-300 rounded-md"
                />
              ))}

              <button type="submit" className="bg-green-600 text-white py-2 rounded-md font-bold">
                ✅ Guardar Paciente
              </button>
            </form>
          )}

          <h2 className="text-center text-xl font-semibold my-6">👥 Listado de Pacientes</h2>

          {error && (
            <p className="bg-red-100 text-red-700 p-3 mb-4 rounded-md">
              {error}
            </p>
          )}

          <ul className="space-y-3">
            {pacientes.map((p, idx) => (
              <button
                key={idx}
                onClick={() => router.push(`/usuario/info/${p.id}`)}
                className="w-full text-left p-4 bg-gray-100 rounded-md border-l-4 border-blue-600 hover:bg-gray-200 transition"
              >
                <strong>{p.nombre_completo}</strong> — CC: {p.identificacion_cc} — {p.direccion_de_residencia}
              </button>
            ))}
          </ul>
        </>
      )}

      {/* Reportes Tab */}
      {activeTab === 'reportes' && (
        <div className="text-center mt-10">
          <h2 className="text-xl font-bold mb-4">📊 Módulo de Reportes</h2>
          <ReporteComponent />
        </div>
      )}
    </div>
  );
}
