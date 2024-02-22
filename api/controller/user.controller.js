// Import necessary modules
import jwt from 'jsonwebtoken';
import { UserModel as User } from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export const profile = (req, res) => {
  // Try to extract the token from the Authorization header first
  const tokenFromHeader = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
  // If there's a token in the Authorization header, use it; otherwise, check the cookies
  const token = tokenFromHeader || req.cookies.accessToken; // Assuming the token key is 'accessToken'

  if (!token) {
    // If no token is provided, respond with null
    return res.json(null);
  }

  // Verify the token using the verifyToken middleware
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      // If the token is invalid, respond with null or an appropriate error message
      return res.json(null);
    }

    try {
      // If the token is valid, find the user by ID in the database
      const { name, email, _id } = await User.findById(userData.id);

      // Respond with the user data
      res.json({ name, email, _id });
    } catch (error) {
      // Handle database errors or other issues
      console.error('Error retrieving user data:', error);
      res.status(500).json({ message: 'Error retrieving user data', error: 'Internal Server Error' });
    }
  });
};


