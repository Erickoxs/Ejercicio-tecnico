import { Router } from 'express';
import { createTask, getTasks, getTasksByUserId, getTasksByPriority, getTasksByStatus, updateTask, deleteTask } from '../controllers/taskController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

// Ruta para crear una nueva tarea
router.post('/tasks', authMiddleware, createTask);

// Ruta para obtener todas las tareas 
router.get('/tasks', getTasks);

// Ruta para obtener todas las tareas del usuario autenticado
router.get('/tasks/:userId', getTasksByUserId);

// Ruta para obtener tareas filtradas por prioridad
router.get('/tasks/priority/:priority', authMiddleware, getTasksByPriority);

// Ruta para obtener tareas filtradas por estado
router.get('/tasks/status/:status', authMiddleware, getTasksByStatus);

// Ruta para actualizar una tarea específica
router.put('/tasks/:id', authMiddleware, updateTask);

// Ruta para eliminar una tarea específica
router.delete('/tasks/:id', authMiddleware, deleteTask);

export default router;
