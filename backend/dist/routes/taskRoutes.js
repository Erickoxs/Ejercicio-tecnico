"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
// Ruta para crear una nueva tarea
router.post('/tasks', authMiddleware_1.default, taskController_1.createTask);
// Ruta para obtener todas las tareas 
router.get('/tasks', taskController_1.getTasks);
// Ruta para obtener todas las tareas del usuario autenticado
router.get('/tasks/:userId', taskController_1.getTasksByUserId);
// Ruta para obtener tareas filtradas por prioridad
router.get('/tasks/priority/:priority', authMiddleware_1.default, taskController_1.getTasksByPriority);
// Ruta para obtener tareas filtradas por estado
router.get('/tasks/status/:status', authMiddleware_1.default, taskController_1.getTasksByStatus);
// Ruta para actualizar una tarea específica
router.put('/tasks/:id', authMiddleware_1.default, taskController_1.updateTask);
// Ruta para eliminar una tarea específica
router.delete('/tasks/:id', authMiddleware_1.default, taskController_1.deleteTask);
exports.default = router;
