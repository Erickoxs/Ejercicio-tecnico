import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI || "";

        // Conexión a la base de datos
        await mongoose.connect(MONGO_URI);

        console.log("Base de datos conectada exitosamente");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        process.exit(1); // Finaliza el proceso si falla la conexión
    }
};

export default connectDB;
