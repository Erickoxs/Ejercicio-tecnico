"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
// Middleware para procesar los cuerpos de solicitudes en JSON
app.use(express_1.default.json());
// Configuración personalizada de CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Asegúrate de que tu frontend esté corriendo en este puerto
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization', // Headers permitidos
};
// Aplica CORS con las opciones configuradas
app.use(cors(corsOptions));
// Usar las rutas de productos, categorías y carrito
app.use("/api", taskRoutes_1.default);
app.use("/api", userRoutes_1.default);
// Exportar la aplicación para usarla en el archivo server.ts
exports.default = app;
