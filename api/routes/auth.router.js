import express from 'express';
import { register, login } from '../controller/auth.controller.js';
const router = express.Router();



// register a new user
router.post('/register', register);
// login a  user
router.post('/login', login);


export default router;