import React, { useState } from "react";
import api from "../utils/api";

// Define la interfaz para las props
interface LoginModalProps {
  onClose: () => void; // Prop para manejar el cierre del modal
  onLogin: (userName: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false); // Estado para el modal de éxito

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("api/users/login", formData);
      console.log("Inicio de sesión exitoso:", response.data);

      // Extraer token y nombre del usuario
      const { token, user } = response.data;
      if (token && user?.name) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("userName", user.name);
        onLogin(user.name);
        console.log("Token y nombre del usuario guardados en localStorage.");

        // Mostrar modal de éxito
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false); // Ocultar modal de éxito después de 2 segundos
          onClose(); // Cerrar el modal principal
        }, 2000);
      } else {
        console.warn("La respuesta no contiene los datos esperados.");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      setErrorMessage("Credenciales inválidas. Intenta nuevamente.");
    }
  };

  return (
    <>
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          role="dialog"
          aria-labelledby="success-modal"
        >
          <div className="relative w-full max-w-md bg-white rounded-lg shadow">
            <div className="flex flex-col items-center p-6">
              <div className="text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m2 4a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2
                id="success-modal"
                className="mt-4 text-xl font-bold text-center text-gray-800"
              >
                Inicio de sesión exitoso
              </h2>
            </div>
          </div>
        </div>
      )}

      {!showSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          role="dialog"
          aria-labelledby="modal-title"
        >
          <div className="relative w-full max-w-md bg-white rounded-lg shadow">
            {/* Botón para cerrar el modal */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              aria-label="Cerrar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="p-6">
              <h2 id="modal-title" className="text-2xl font-bold text-center">
                Iniciar Sesión
              </h2>
              {/* Formulario de inicio de sesión */}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
                {errorMessage && (
                  <p className="mb-4 text-sm text-red-600">{errorMessage}</p>
                )}
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Iniciar Sesión
                </button>
              </form>
              {/* Registro */}
              <div className="mt-4 text-center">
                <span className="text-sm text-gray-700">
                  ¿No estás registrado aún?{" "}
                </span>
                <a
                  href="/register"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Regístrate aquí
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
