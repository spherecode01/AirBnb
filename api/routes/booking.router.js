import express from 'express';
const router = express.Router();
import { verifyToken } from '../utils/verifytoken.js';
import {getBookings, createBooking} from '../controller/booking.controller.js'

router.use(verifyToken);


router.get('/bookings',verifyToken, getBookings);
router.post('/bookings',verifyToken, createBooking);
  


export default router;