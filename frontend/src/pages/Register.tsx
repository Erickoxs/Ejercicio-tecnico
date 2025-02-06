import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Usamos useNavigate para la redirección
import api from "../utils/api"; // Asegúrate de que este archivo esté configurado correctamente

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const navigate = useNavigate(); // Usamos useNavigate para redirigir después del registro

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/users/register", formData);
      console.log("Respuesta del servidor:", response.data);
      setStatusMessage("Usuario registrado con éxito.");

      // Redirigir al usuario a la página de login después de un registro exitoso
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirige después de 2 segundos para mostrar el mensaje

    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      setStatusMessage("Error al registrar el usuario. Intenta nuevamente.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Registro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Nombre:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa tu nombre"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa tu correo"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Contraseña:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Registrar
        </button>
      </form>

      {statusMessage && (
        <p
          className={`mt-4 text-center ${
            statusMessage.includes("éxito")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {statusMessage}
        </p>
      )}
    </div>
  );
};

export default RegisterForm;
