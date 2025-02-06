import { Request, Response, NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    // Obtener el token desde los headers de la solicitud
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
         res.status(401).json({ message: 'No token provided' });
         return;
    }

    // Si el token está presente, continuar con la solicitud
    next();
};

export default authMiddleware;
