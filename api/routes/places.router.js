// Import necessary modules and middleware
import express from 'express';
import { verifyToken } from '../utils/verifytoken.js';
import { getPlacesList, getPlaceById, userPlaces, createPlace, editPost } from '../controller/places.controller.js';

const router = express.Router();

// Apply verifyToken middleware to protect routes
router.use(verifyToken);

// Define routes
router.get('/places', getPlacesList);
router.get('/places/:id', getPlaceById);
router.get('/user-places', userPlaces);
router.post('/places', createPlace);
router.put('/places', editPost);

export default router;
