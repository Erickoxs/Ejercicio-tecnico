import React from "react";
import api from "../utils/api"; // Aquí estamos importando tu instancia de api

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "alta" | "media" | "baja";
  status: "pendiente" | "completada";
  userId: string;
}

interface TaskCardProps {
  task: Task;
  onComplete: (taskId: string) => void; // Función para marcar la tarea como completada
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete }) => {
  const formatDate = (date: string): string => {
    const formattedDate = new Date(date);
    return `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}`;
  };

  // Función para realizar la petición PUT y actualizar el status
  const handleComplete = async (taskId: string) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No token found");
      }

      const response = await api.put(
        `/api/tasks/${taskId}`,
        { status: "completada" },  // El cuerpo de la solicitud
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,  // El token de autenticación
          }
        }
      );

      if (response.status === 200) {
        // Llamamos a la función onComplete pasada por las props para reflejar el cambio
        onComplete(taskId);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h3 className="text-2xl font-semibold text-gray-800">{task.title}</h3>
      <p className="text-gray-600 mt-2">{task.description}</p>
      <p className="text-gray-700 mt-2">
        <strong>Fecha de vencimiento:</strong> {formatDate(task.dueDate)}
      </p>
      <p className="text-gray-700 mt-2">
        <strong>Prioridad:</strong> {task.priority}
      </p>
      <p className="text-gray-700 mt-2">
        <strong>Estado:</strong> {task.status}
      </p>
      <div className="flex justify-end mt-4">
        {task.status !== "completada" && (
          <button
            onClick={() => handleComplete(task._id)} // Llama a la función handleComplete para hacer la petición PUT
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Marcar como completada
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
