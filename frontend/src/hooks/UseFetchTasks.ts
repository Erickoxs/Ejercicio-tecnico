import { useState, useEffect } from "react";
import api from "../utils/api";

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "alta" | "media" | "baja";
  status: "pendiente" | "completada";
  userId: string;
}

const useFetchTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/api/tasks");
        setTasks(response.data.tasks);
        console.log(response.data)
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return { tasks, loading, error };
};

export default useFetchTasks;
