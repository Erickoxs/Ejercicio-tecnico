import React from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate
import useFetchTasks from "../hooks/UseFetchTasks"; // Asegúrate de tener este hook que recupera las tareas
import api from "../utils/api";

const TaskList: React.FC = () => {
  const { tasks, loading, error } = useFetchTasks(); // Suponiendo que tasks es un arreglo de tareas
  const navigate = useNavigate(); // Inicializa el hook de navegación

  const formatDate = (date: string): string => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("es-ES"); // Cambia a tu formato preferido
  };

  const handleDelete = async (taskId: string) => {
    try {
      // Realizamos la petición DELETE con las cabeceras
      await api.delete(`/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });
      // Redirigimos a la lista de tareas después de eliminar
      window.location.reload(); // Recarga la página para reflejar la eliminación
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Lista de Tareas</h1>
      
      {/* Botón para redirigir a la página de creación de tarea */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => navigate("/add")} // Redirige a la ruta de crear tarea
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Agregar tarea
        </button>
      </div>

      {/* Lista de tareas */}
      <ul className="space-y-4 max-w-screen-xl mx-auto">
        {tasks.map((task) => (
          <li key={task._id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
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
            <div className="flex justify-end space-x-4 mt-4">
              <a href={`/update/${task._id}`}>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Editar
                </button>
              </a>
              <button
                onClick={() => handleDelete(task._id)} // Llamada a la función handleDelete
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
