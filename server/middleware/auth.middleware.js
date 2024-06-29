import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AppError from "../Utils/AppError.js";

dotenv.config();
const isLoggedIn = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Unauthenticated, please login", 401));
  }

  const tokenDetails = jwt.verify(token, process.env.JWT_SECRET);
  if (!tokenDetails) {
    return next(new AppError("Unauthenticated, please login", 401));
  }

  req.user = tokenDetails;

  next();
};

export { isLoggedIn };
