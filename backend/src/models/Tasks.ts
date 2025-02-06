import { Schema, model, Document } from 'mongoose';
import mongoose from 'mongoose';

export interface ITask extends Document {
    title: string;
    description: string;
    dueDate: Date;
    priority: 'alta' | 'media' | 'baja';
    status: 'pendiente' | 'completada';
    userId: mongoose.Types.ObjectId; // Referencia al modelo de Usuario
}

const TaskSchema = new Schema<ITask>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priority: { type: String, enum: ['alta', 'media', 'baja'], required: true },
    status: { type: String, enum: ['pendiente', 'completada'], default: 'pendiente' },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true } // Relación con el modelo de Usuario
});

export default model<ITask>('Task', TaskSchema);
