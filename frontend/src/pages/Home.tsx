import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Cambiamos useHistory por useNavigate
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate(); // Usamos useNavigate para redirigir
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Verificamos si existe el token en el localStorage
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    // Si no existe el token, redirigimos al login
    if (!token) {
      navigate("/login"); // Redirigimos a la página de login
    } else {
      setUserId(userId); // Guardamos el userId si el token es válido
    }
  }, [navigate]);

  // Si el userId no está disponible, no renderizamos los botones
  if (!userId) return <p>Cargando...</p>;

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Bienvenido</h1>
      <div className="flex justify-center gap-6">
        {/* Botón para ver tareas asignadas */}
        <Link to={`/userTasks/${userId}`}>
          <button
            className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ver tareas asignadas
          </button>
        </Link>

        {/* Botón para gestionar tareas */}
        <Link to="/manage-tasks">
          <button
            className="px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            Gestionar tareas
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
