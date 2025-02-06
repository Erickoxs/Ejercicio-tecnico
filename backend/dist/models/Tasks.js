"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priority: { type: String, enum: ['alta', 'media', 'baja'], required: true },
    status: { type: String, enum: ['pendiente', 'completada'], default: 'pendiente' },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true } // Relación con el modelo de Usuario
});
exports.default = (0, mongoose_1.model)('Task', TaskSchema);
