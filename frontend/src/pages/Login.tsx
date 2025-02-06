import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Usamos useNavigate para la redirección
import api from '../utils/api'; // Asegúrate de que api esté configurado correctamente para hacer las peticiones

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Para la redirección después de login

  // Manejador para el submit del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Realizamos la petición POST al backend
      const response = await api.post('/api/users/login', {
        email,
        password, // Enviamos el email y la contraseña
      });

      // Verificamos si la respuesta es exitosa
      if (!response || !response.data || !response.data.token) {
        throw new Error('Correo o contraseña incorrectos');
      }

      const { token, user } = response.data; // Desestructuramos el token de la respuesta

      // Almacenar el token en localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem("userName", user.name)
      localStorage.setItem("userId", user.id)
      localStorage.setItem("role", user.role)
      console.log(user)

      // Redirigir al usuario a la página principal
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 mt-4 text-white rounded-lg ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <a href="/register" className="text-blue-500 hover:text-blue-600">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
