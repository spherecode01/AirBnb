import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { PlaceModel as Place } from '../models/Place.js';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.accessToken, jwtSecret, {}, async (err, userData) => {
      if (err) reject(err);
      resolve(userData);
    });
  });
}

export const userPlaces = async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);

    const { id } = userData;

    const userPlaces = await Place.find({ owner: id });
    res.json(userPlaces);
  } catch (error) {
    console.error('Error fetching user places:', error);
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};

export const getPlaceById = async (req, res) => {
  try {
    await getUserDataFromReq(req);

    const { id } = req.params;

    const place = await Place.findById(id);
    if (!place) {
      res.status(404).json({ message: 'Place not found' });
      return;
    }
    res.json(place);
  } catch (error) {
    console.error('Error fetching place by ID:', error);
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};

export const createPlace = async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);

    const {
      title, address, addedPhotos, description, price,
      perks, extraInfo, checkIn, checkOut, maxGuests,
    } = req.body;

    const placeDoc = await Place.create({
      owner: userData.id, price,
      title, address, photos: addedPhotos, description,
      perks, extraInfo, checkIn, checkOut, maxGuests,
    });

    res.json(placeDoc);
  } catch (error) {
    console.error('Error creating place:', error);
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};

export const editPost = async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);

    const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;

    const placeDoc = await Place.findById(id);

    if (!placeDoc) {
      res.status(404).json({ message: 'Place not found' });
      return;
    }

    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title, address, photos: addedPhotos, description,
        perks, extraInfo, checkIn, checkOut, maxGuests, price,
      });
      await placeDoc.save();
      res.json('ok');
    } else {
      res.status(403).json({ message: 'Forbidden', error: 'User does not own the place' });
    }
  } catch (error) {
    console.error('Error editing place:', error);
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};

export const getPlacesList = async (req, res) => {
  try {
    await getUserDataFromReq(req);

    const places = await Place.find();
    res.json(places);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};
