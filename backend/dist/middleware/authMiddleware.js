"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware = (req, res, next) => {
    var _a;
    // Obtener el token desde los headers de la solicitud
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }
    // Si el token está presente, continuar con la solicitud
    next();
};
exports.default = authMiddleware;
