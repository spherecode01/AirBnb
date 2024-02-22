import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  // Try to extract the token from the Authorization header first
  const tokenFromHeader = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
  // If there's a token in the Authorization header, use it; otherwise, check the cookies
  const token = tokenFromHeader || req.cookies.accessToken; // Assuming the token key is 'accessToken'

  if (!token) {
    // Redirect to the login page if no token is provided
    return res.redirect('/login'); // Adjust the path to your login page
  }

  jwt.verify(token, jwtSecret, {}, (err, userData) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.userData = userData;
    next();
  });
};
