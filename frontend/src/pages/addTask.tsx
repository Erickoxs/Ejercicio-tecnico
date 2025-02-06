import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; // Asegúrate de tener el archivo api.ts configurado correctamente

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"alta" | "media" | "baja">("media");
  const [status, setStatus] = useState<"pendiente" | "completada">("pendiente");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar los campos
    if (!title || !description || !dueDate) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Crear la nueva tarea
      const newTask = {
        title,
        description,
        dueDate,
        priority,
        status,
        userId: localStorage.getItem("userId"), // Asumiendo que el userId está almacenado en localStorage
      };

      // Enviar la solicitud POST para crear la tarea
      const response = await api.post("/api/tasks", newTask, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      // Si la creación fue exitosa, redirigir a la lista de tareas
      if (response) {
        navigate("/"); // Redirigir a la lista de tareas
      }
    } catch (error) {
      setError("Hubo un error al crear la tarea. Intenta nuevamente.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Crear Nueva Tarea</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold" htmlFor="title">
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            placeholder="Ingresa el título de la tarea"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold" htmlFor="description">
            Descripción
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            placeholder="Ingresa la descripción de la tarea"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold" htmlFor="dueDate">
            Fecha de Vencimiento
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold" htmlFor="priority">
            Prioridad
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as "alta" | "media" | "baja")}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          >
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold" htmlFor="status">
            Estado
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as "pendiente")}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          >
            <option value="pendiente">Pendiente</option>
          </select>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Crear Tarea
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
