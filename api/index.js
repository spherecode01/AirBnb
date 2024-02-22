import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import imageDownloader from 'image-downloader';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import fs from 'fs'
import dotenv from 'dotenv';
import authRouter from './routes/auth.router.js';
import placeRouter from './routes/places.router.js'
import bookingRoute from './routes/booking.router.js'
import userRouter from './routes/user.router.js'
import photoRouter from './routes/photo.router.js'
import { photoMiddleware, handleUpload, handleLinkUpload } from './middleware/photo.middleware.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(new URL('uploads/', import.meta.url).pathname));
app.use(cors({credentials: true, origin: 'https://illustrious-kashata-687ded.netlify.app'}));

app.post('/upload', photoMiddleware.array('photos', 100), handleUpload);

app.post('/upload-by-link', express.json(), handleLinkUpload);

app.get('/test', (req, res) => {
  res.json('test OK');
});

app.use('/auth', authRouter)
app.use('/places', placeRouter)
app.use('/booking', bookingRoute)
app.use('/user', userRouter)

mongoose.connect(process.env.MONGO_URL)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection disconnected through app termination');
    process.exit(0);
  });
});

const port = process.env.PORT || 4000;
console.log(port)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
