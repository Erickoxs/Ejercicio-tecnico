import { Router } from 'express';
import { registerUser, getUsers, getUserById, updateUser, deleteUser, loginUser } from '../controllers/userController';

const router = Router();

router.post('/users/register', registerUser);
router.post('/users/login', loginUser)
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
