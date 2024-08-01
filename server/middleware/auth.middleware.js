import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AppError from "../Utils/AppError.js";

dotenv.config();
const isLoggedIn = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token from cookie:", token);

  if (!token) {
    console.log("No token found in cookies");
    return next(new AppError("Unauthenticated, please login", 401));
  }

  try {
    const tokenDetails = jwt.verify(token, process.env.JWT_SECRET);
    req.user = tokenDetails;
    next();
  } catch (err) {
    console.log("Token verification failed:", err.message);
    return next(new AppError("Unauthenticated, please login", 401));
  }
};


const verifyToken = (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Extract token after "Bearer "

  if (!token) {
    return res.status(401).json({ message: 'Malformed token' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Attach the user details to the request object
    req.user = user;
    next();
  });
};

export default verifyToken;

export { isLoggedIn, verifyToken };
