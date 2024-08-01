import User from "../models/User.js";
import dotenv from "dotenv";
import AppError from "../Utils/AppError.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import sendEmail from "../Utils/sendEmail.js";
import crypto from "crypto";

dotenv.config();

const CookieOptions = {
  secure: true,
  sameSite : "None",
  maxAge: 7 * 24 * 60 * 60, // 7 days
  httpOnly: true,
};

const register = async (req, res, next) => {
  console.log("Register");
  try {
    const { userName, email, password, phone, github, linkedin } = req.body;

    if (!userName || !email || !password || !phone || !github || !linkedin) {
      return next(new AppError("Fill all the fields", 400));
    }

    // Checking if already the email, userName, phone entered already exists

    const isUserName = await User.findOne({ userName: userName });
    if (isUserName) {
      return next(new AppError("userName already exists", 400));
    }
    const isEmail = await User.findOne({ email: email });
    if (isEmail) {
      return next(new AppError("Email already exists", 400));
    }
    const isPhone = await User.findOne({ phone: phone });
    if (isPhone) {
      return next(new AppError(`phone No ${phone} already exists`, 400));
    }

    const newUser = new User({
      userName,
      email,
      password,
      phone,
      github,
      linkedin,
      avatar: {
        public_id: email,
        secure_url:
          "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*7VyEZgzwUhQMeBqb",
      },
    });

    // TODO: Upload user picture

    console.log("File details -> ", JSON.stringify(req.file));
    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "OJ", // Save files in a folder named OJ
          width: 250,
          height: 250,
          gravity: "faces", // This option tells cloudinary to center the image around detected faces (if any) after cropping or resizing the original image
          crop: "fill",
        });

        if (result) {
          newUser.avatar.public_id = result.public_id;
          newUser.avatar.secure_url = result.secure_url;

          // removing the file from local server
          fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (error) {
        return next(
          new AppError(error.message || "File not uploaded, try again", 500)
        );
      }
    }

    await newUser.save();

    const token = newUser.generateJWTToken();
    res.cookie("token", token, CookieOptions);

    newUser.password = undefined;
    res.status(201).json({
      success: true,
      message: "User registered succeessfully",
      token,
      user: newUser,
    });
  } catch (error) {
    console.log("error");
    res.status(500).json({ message: `user not registered ${error}` });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(password);
    
    if (!email || !password)
    return next(new AppError("Please fill all the fields", 400));
  
  const userAccount = await User.findOne({ email }).select("+password");
  // console.log(await userAccount.comparePassword(password));

    if (!(userAccount && (await userAccount.comparePassword(password)))) {
      return next(new AppError(`Email or password do not  match`, 400));
    }

    const token = userAccount.generateJWTToken();
    userAccount.password = undefined;

    res.cookie("token", token, CookieOptions);
    res.status(201).json({
      success: true,
      token,
      message: "Login successful ",
      user: userAccount,
    });
  } catch (error) {
    console.error(error);
    return next(new AppError(`${error.message}`, 400));
  }
};

const logout = (req, res) => {
  try {
    res.cookie("token", null, {
      secure: true,
      maxAge: 0,
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: `Error ${error.message}` });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      message: "details fetched successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: `Error ${error.message}` });
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Email is required", 400));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("Email is not registered", 400));
  }

  const resetToken = await user.generatePasswordToken();

  await user.save();

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  const subject = "Reset Password";
  const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordUrl}.\n If you have not requested this, kindly ignore.`;
  console.log(resetPasswordUrl);
  try {
    // TODO : create sendEmail done now
    await sendEmail(email, subject, message);

    res.status(200).json({
      success: true,
      message: `Reset password link has been sent to the ${email} `,
    });
  } catch (e) {
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save();
    return next(new AppError(e.message || "Please login again", 500));
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { resetToken } = req.params;

    const { password } = req.body;

    const forgotPasswordToken = await crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await User.findOne({
      forgotPasswordToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return next(
        new AppError("Token is invalid or expired, please try again", 400)
      );
    }

    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const id = req.user.id;
    if (!oldPassword || !newPassword) {
      return next(new AppError("All fields are mandatory", 400));
    }

    const user = await User.findById(id).select("+password");

    if (!user) {
      return next(new AppError("User do not exist", 400));
    }
    const isPasswordValid = await user.comparePassword(oldPassword);

    if (!isPasswordValid) {
      return next(new AppError("Invlaid old password", 400));
    }
    user.password = newPassword;
    await user.save();
    user.password = undefined;
    res.status(200).json({
      success: true,
      message: "password changed successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { userName } = req.body;
  const id = req.user.id;

  const user = await User.findById(id);
  if (!user) {
    return next(new AppError("user do not exist", 400));
  }

  if (userName) {
    user.userName = userName;
  }

  if (req.file) {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "OJ", // Save files in a folder named OJ
      width: 250,
      height: 250,
      gravity: "faces", // This option tells cloudinary to center the image around detected faces (if any) after cropping or resizing the original image
      crop: "fill",
    });

    if (result) {
      user.avatar.public_id = result.public_id;
      user.avatar.secure_url = result.secure_url;

      // removing the file from local server
      fs.rm(`uploads/${req.file.filename}`);
    }

    await user.save();
    res.status(200).json({
      success : true,
      message : 'User Details updated successfully'
    })
  }
  } catch (error) {
    return next(new AppError(e.message || "something wrong occured"), 400);
  }
};

export {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  updateProfile,
};
