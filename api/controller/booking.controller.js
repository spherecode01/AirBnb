import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { BookingModel as Booking  } from "../models/Booking.js";

dotenv.config();


const jwtSecret = process.env.JWT_SECRET;

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.accessToken, jwtSecret, {}, async (err, userData) => {
      if(err) throw err;
      resolve(userData);
    });
  })
}


export const getBookings = async (req,res) => {
   
    const userData = await getUserDataFromReq(req);
    res.json( await Booking.find({user:userData.id}).populate('place') );
  }

export const createBooking = async (req, res) => {
    
    const userData = await getUserDataFromReq(req);
    const {
      place,checkIn,checkOut,numberOfGuests,name,phone,price,
    } = req.body;
    Booking.create({
      place,checkIn,checkOut,numberOfGuests,name,phone,price,
      user:userData.id,
    }).then((doc) => {
      res.json(doc);
    }).catch((err) => {
      throw err;
    });
  }