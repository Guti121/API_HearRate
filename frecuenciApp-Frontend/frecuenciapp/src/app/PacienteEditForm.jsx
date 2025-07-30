"use client";
import { useState } from "react";
import { urlBase } from "./globalParams";

const PacienteEditForm = ({ initialData, onCancel, onSave }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      console.log(formData)
      const response = await fetch(`${urlBase}pacientes/${formData.id}/`, {
        method: "PUT",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const updated = await response.json();
      console.log(updated)
      onSave(updated);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.entries(formData).map(([key, value]) => {
        if (key  === "identificacion_cc" || key === "id") return null; // skip editing this
        return (
          <div key={key}>
            <label className="block font-semibold capitalize">{key.replace(/_/g, " ")}:</label>
            <input
              name={key}
              value={value}
              onChange={handleChange}
              className="w-full border rounded px-3 py-1"
            />
          </div>
        );
      })}

      <div className="flex justify-between mt-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
        <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
      </div>
    </form>
  );
};

export default PacienteEditForm;
