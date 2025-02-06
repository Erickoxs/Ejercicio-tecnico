"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasksByStatus = exports.getTasksByPriority = exports.getTasksByUserId = exports.getTasks = exports.createTask = void 0;
const Tasks_1 = __importDefault(require("../models/Tasks"));
//  Crear una nueva tarea
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, dueDate, priority, userId } = req.body; // userId lo pasa el cliente
        const newTask = new Tasks_1.default({
            title,
            description,
            dueDate,
            priority,
            userId // no dependemos de la autenticación para obtener el userId
        });
        yield newTask.save();
        res.status(201).json({ message: 'Tarea creada correctamente', task: newTask });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear la tarea' });
    }
});
exports.createTask = createTask;
// 🔎 Obtener todas las tareas de un usuario
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Tasks_1.default.find().sort({ dueDate: 1 });
        res.json({ tasks });
    }
    catch (error) {
        console.error('Error en getTasks:', error);
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
});
exports.getTasks = getTasks;
//  Obtener tareas por userId
const getTasksByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            res.status(400).json({ message: 'El userId es obligatorio' });
            return;
        }
        const tasks = yield Tasks_1.default.find({ userId }).sort({ dueDate: 1 });
        res.json({ tasks });
    }
    catch (error) {
        console.error('Error en getTasksByUserId:', error);
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
});
exports.getTasksByUserId = getTasksByUserId;
//  Obtener tareas por prioridad
const getTasksByPriority = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, priority } = req.params; // userId y prioridad como parámetros
        const tasks = yield Tasks_1.default.find({ userId, priority }).sort({ dueDate: 1 });
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al filtrar tareas por prioridad' });
    }
});
exports.getTasksByPriority = getTasksByPriority;
// Obtener tareas por estado
const getTasksByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, status } = req.params; // userId y estado como parámetros
        const tasks = yield Tasks_1.default.find({ userId, status }).sort({ dueDate: 1 });
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al filtrar tareas por estado' });
    }
});
exports.getTasksByStatus = getTasksByStatus;
//  Actualizar una tarea
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, dueDate, priority, status } = req.body;
        console.log("Buscando tarea con ID:", id);
        const task = yield Tasks_1.default.findOne({ _id: id });
        if (!task) {
            console.log("Tarea no encontrada");
            res.status(404).json({ message: 'Tarea no encontrada' });
            return; // Asegúrate de que se detenga la ejecución aquí
        }
        console.log("Tarea encontrada, actualizando...");
        if (title)
            task.title = title;
        if (description)
            task.description = description;
        if (dueDate)
            task.dueDate = dueDate;
        if (priority)
            task.priority = priority;
        if (status)
            task.status = status;
        yield task.save();
        // Si la tarea es encontrada y actualizada, enviamos la respuesta aquí.
        console.log("Tarea actualizada, enviando respuesta...");
        res.json({ message: 'Tarea actualizada correctamente', task });
    }
    catch (error) {
        console.error("Error al actualizar la tarea:", error);
        // Si ya hemos enviado una respuesta, no hacemos nada más
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al actualizar la tarea' });
        }
    }
});
exports.updateTask = updateTask;
//  Eliminar una tarea
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield Tasks_1.default.findOneAndDelete({ _id: id });
        if (!task) {
            res.status(404).json({ message: 'Tarea no encontrada' });
            return;
        }
        res.json({ message: 'Tarea eliminada correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
});
exports.deleteTask = deleteTask;
