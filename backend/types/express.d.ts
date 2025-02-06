import { IUser } from '../src/models/User'; // Asegúrate de que el modelo de Usuario esté importado

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Define que la propiedad 'user' es opcional y tiene el tipo IUser
    }
  }
}
