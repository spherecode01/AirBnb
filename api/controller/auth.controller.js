import jwt from 'jsonwebtoken';
import { UserModel as User } from '../models/User.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

// Function to create a JWT token
const createToken = (userId) => {
  return jwt.sign({ id: userId }, jwtSecret, { expiresIn: '1h' });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    });
    res.json(userDoc);
  } catch (e) {
    console.error('Error creating user:', e);
    res.status(422).json({ message: 'Registration failed', error: e.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // If login is successful, generate a JWT token using createToken function
    const token = createToken(user._id);

    // Set the token as a cookie
    res.cookie('accessToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    // Send a response with the token in the JSON payload
    res.json({ message: 'Login successful', data: user, accessToken: token });
  } catch (error) {
    if (error.message === 'Invalid password') {
      res.status(401).json({ message: 'Invalid password', error: 'Unauthorized' });
    } else if (error.message === 'User not found') {
      res.status(404).json({ message: 'User not found', error: 'Not Found' });
    } else {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Login failed', error: 'Internal Server Error' });
    }
  }
};

export const logout = (req, res) => {
  // Clear the access token cookie
  res.clearCookie('accessToken');

  // Optionally, you can perform additional logout logic here if needed
  // For example, clear user-related data from the session or perform other cleanup

  res.json({ message: 'Logout successful' });
};
