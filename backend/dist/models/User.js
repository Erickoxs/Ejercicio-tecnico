"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
// Define el esquema de Mongoose
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: {
        type: [String],
        enum: ['user', 'admin'], // Solo permite estos valores
        default: ['user'], // Por defecto, el rol será "user"
    },
}, {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
});
// Crea y exporta el modelo
exports.User = (0, mongoose_1.model)('User', userSchema);
