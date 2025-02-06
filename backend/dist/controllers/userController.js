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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.loginUser = exports.registerUser = void 0;
const User_1 = require("../models/User"); // Asegúrate de que la ruta sea correcta
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Registrar un nuevo usuario
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, roles } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: 'Todos los campos son obligatorios.' });
            return;
        }
        const userExists = yield User_1.User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'El usuario ya está registrado.' });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.User({
            name,
            email,
            password: hashedPassword,
            roles: roles || ['user'],
        });
        yield newUser.save();
        res.status(201).json({ message: 'Usuario creado con éxito.', user: newUser });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al crear el usuario.', error: err });
    }
});
exports.registerUser = registerUser;
// Iniciar sesión
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'El correo electrónico y la contraseña son obligatorios.' });
            return;
        }
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado.' });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Contraseña incorrecta.' });
            return;
        }
        const secretKey = process.env.JWT_SECRET || 'clave_secreta';
        const token = jsonwebtoken_1.default.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
        res.status(200).json({
            message: 'Inicio de sesión exitoso.',
            token,
            user: { id: user._id, name: user.name, roles: user.roles },
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al iniciar sesión.', error: err });
    }
});
exports.loginUser = loginUser;
// Obtener todos los usuarios
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find();
        res.status(200).json(users);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener los usuarios.', error: err });
    }
});
exports.getUsers = getUsers;
// Obtener un usuario por ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.User.findById(id);
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado.' });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener el usuario.', error: err });
    }
});
exports.getUserById = getUserById;
// Actualizar un usuario
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, email, roles } = req.body;
        const updatedUser = yield User_1.User.findByIdAndUpdate(id, { name, email, roles }, { new: true, runValidators: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'Usuario no encontrado.' });
            return;
        }
        res.status(200).json({ message: 'Usuario actualizado con éxito.', user: updatedUser });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al actualizar el usuario.', error: err });
    }
});
exports.updateUser = updateUser;
// Eliminar un usuario
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield User_1.User.findByIdAndDelete(id);
        if (!deletedUser) {
            res.status(404).json({ message: 'Usuario no encontrado.' });
            return;
        }
        res.status(200).json({ message: 'Usuario eliminado con éxito.' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al eliminar el usuario.', error: err });
    }
});
exports.deleteUser = deleteUser;
