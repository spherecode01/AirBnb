import express from 'express';
const router = express.Router();
import {profile} from '../controller/user.controller.js'
//import { logout } from '../controller/user.controller.js';
import { logout } from '../controller/auth.controller.js';
import { verifyToken } from '../utils/verifytoken.js';



router.use(verifyToken);

router.get('/profile', profile);
router.post('/logout', logout);
  
export default router;