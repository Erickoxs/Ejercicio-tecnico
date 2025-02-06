import { Request, Response } from 'express';
import { User } from '../models/User'; // Asegúrate de que la ruta sea correcta
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Registrar un nuevo usuario
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, roles } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: 'Todos los campos son obligatorios.' });
      return;
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'El usuario ya está registrado.' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      roles: roles || ['user'],
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuario creado con éxito.', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear el usuario.', error: err });
  }
};

// Iniciar sesión
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'El correo electrónico y la contraseña son obligatorios.' });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado.' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Contraseña incorrecta.' });
      return;
    }

    const secretKey = process.env.JWT_SECRET || 'clave_secreta';
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Inicio de sesión exitoso.',
      token,
      user: { id: user._id, name: user.name, roles: user.roles },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al iniciar sesión.', error: err });
  }
};

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener los usuarios.', error: err });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado.' });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener el usuario.', error: err });
  }
};

// Actualizar un usuario
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, roles } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, roles },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: 'Usuario no encontrado.' });
      return;
    }

    res.status(200).json({ message: 'Usuario actualizado con éxito.', user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar el usuario.', error: err });
  }
};

// Eliminar un usuario
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      res.status(404).json({ message: 'Usuario no encontrado.' });
      return;
    }

    res.status(200).json({ message: 'Usuario eliminado con éxito.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al eliminar el usuario.', error: err });
  }
};
