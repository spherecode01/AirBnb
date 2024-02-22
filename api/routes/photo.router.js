import express from 'express';
import { handleLinkUpload } from '../controller/photo.controller.js';
const router = express.Router();


router.post('/photoup', handleLinkUpload);


export default router;