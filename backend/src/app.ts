import express, { Application } from "express";
const cors = require('cors');
import taskRoutes from "./routes/taskRoutes"
import userRoutes from "./routes/userRoutes"

const app: Application = express();

// Middleware para procesar los cuerpos de solicitudes en JSON
app.use(express.json());

// Configuración personalizada de CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Asegúrate de que tu frontend esté corriendo en este puerto
  methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
  allowedHeaders: 'Content-Type,Authorization', // Headers permitidos
};

// Aplica CORS con las opciones configuradas
app.use(cors(corsOptions));

// Usar las rutas de productos, categorías y carrito
app.use("/api", taskRoutes);
app.use("/api", userRoutes)

// Exportar la aplicación para usarla en el archivo server.ts
export default app;
