import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import api from "../utils/api";

const UserTasks: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const [allTasks, setAllTasks] = useState<any[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [priority, setPriority] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const fetchTasks = async (userId: string) => {
    try {
      console.log(`Fetching tasks for user: ${userId}`);
      const response = await api.get(`/api/tasks/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Response:", response.data);
      setAllTasks(response.data.tasks);
      setFilteredTasks(response.data.tasks); // Inicialmente, mostramos todas las tareas
    } catch (err) {
      setError("Error al cargar las tareas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && token) {
      fetchTasks(userId);
    }
  }, [userId, token]);

  // Función para filtrar por prioridad
  const filterByPriority = (priority: string) => {
    setPriority(priority);
    setFilteredTasks(allTasks.filter(task => task.priority === priority));
  };

  // Función para filtrar por estado
  const filterByStatus = (status: string) => {
    setStatus(status);
    setFilteredTasks(allTasks.filter(task => task.status === status));
  };

  // Función para limpiar filtros y mostrar todas las tareas
  const clearFilter = () => {
    setFilteredTasks(allTasks);
    setPriority(null);
    setStatus(null);
    setFilter(null);
  };

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Lista de Tareas</h1>

      <div className="flex justify-center mb-4 space-x-2">
        <select
          className="px-4 py-2 bg-gray-300 rounded"
          value={priority || ""}
          onChange={(e) => filterByPriority(e.target.value)}
        >
          <option value="">Filtrar por Prioridad</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>

        <select
          className="px-4 py-2 bg-gray-300 rounded"
          value={status || ""}
          onChange={(e) => filterByStatus(e.target.value)}
        >
          <option value="">Filtrar por Estado</option>
          <option value="pendiente">Pendiente</option>
          <option value="completada">Completada</option>
        </select>

        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={clearFilter}>
          Quitar Filtros
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mx-auto max-w-screen-xl">
        {filteredTasks.map((task) => (
          <div key={task._id} className="w-full max-w-xs">
            <TaskCard task={task} onComplete={(taskId) => console.log(`Completada tarea ${taskId}`)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTasks;
