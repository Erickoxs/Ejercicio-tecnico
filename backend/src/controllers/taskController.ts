import { Request, Response } from 'express';
import Task, { ITask } from '../models/Tasks';

//  Crear una nueva tarea
export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, dueDate, priority, userId } = req.body; // userId lo pasa el cliente

        const newTask: ITask = new Task({
            title,
            description,
            dueDate,
            priority,
            userId // no dependemos de la autenticación para obtener el userId
        });

        await newTask.save();
        res.status(201).json({ message: 'Tarea creada correctamente', task: newTask });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tarea' });
    }
};

// 🔎 Obtener todas las tareas de un usuario
export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks: ITask[] = await Task.find().sort({ dueDate: 1 });
        res.json({ tasks });
    } catch (error) {
        console.error('Error en getTasks:', error);
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
};

//  Obtener tareas por userId
export const getTasksByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        if (!userId) {
            res.status(400).json({ message: 'El userId es obligatorio' });
            return;
        }

        const tasks: ITask[] = await Task.find({ userId }).sort({ dueDate: 1 });

        res.json({ tasks });
    } catch (error) {
        console.error('Error en getTasksByUserId:', error);
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
};

//  Obtener tareas por prioridad
export const getTasksByPriority = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, priority } = req.params; // userId y prioridad como parámetros

        const tasks: ITask[] = await Task.find({ userId, priority }).sort({ dueDate: 1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error al filtrar tareas por prioridad' });
    }
};

// Obtener tareas por estado
export const getTasksByStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, status } = req.params; // userId y estado como parámetros

        const tasks: ITask[] = await Task.find({ userId, status }).sort({ dueDate: 1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error al filtrar tareas por estado' });
    }
};


//  Actualizar una tarea
export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, description, dueDate, priority, status} = req.body;

        console.log("Buscando tarea con ID:", id);

        const task: ITask | null = await Task.findOne({ _id: id});
        if (!task) {
            console.log("Tarea no encontrada");
            res.status(404).json({ message: 'Tarea no encontrada' });
            return; // Asegúrate de que se detenga la ejecución aquí
        }

        console.log("Tarea encontrada, actualizando...");
        if (title) task.title = title;
        if (description) task.description = description;
        if (dueDate) task.dueDate = dueDate;
        if (priority) task.priority = priority;
        if (status) task.status = status;

        await task.save();

        // Si la tarea es encontrada y actualizada, enviamos la respuesta aquí.
        console.log("Tarea actualizada, enviando respuesta...");
        res.json({ message: 'Tarea actualizada correctamente', task });
    } catch (error) {
        console.error("Error al actualizar la tarea:", error);

        // Si ya hemos enviado una respuesta, no hacemos nada más
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al actualizar la tarea' });
        }
    }
};

//  Eliminar una tarea
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
       

        const task: ITask | null = await Task.findOneAndDelete({ _id: id});
        if (!task) {
            res.status(404).json({ message: 'Tarea no encontrada' });
            return;
        }

        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
};
