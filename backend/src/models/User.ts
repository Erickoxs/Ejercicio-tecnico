import { Schema, model, Document } from 'mongoose';

// Define la interfaz para el documento del modelo
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  roles: ('user' | 'admin')[]; // Lista de roles
  createdAt: Date;
  updatedAt?: Date;
}

// Define el esquema de Mongoose
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: {
      type: [String],
      enum: ['user', 'admin'], // Solo permite estos valores
      default: ['user'], // Por defecto, el rol será "user"
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);

// Crea y exporta el modelo
export const User = model<IUser>('User', userSchema);
