import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import crypto from 'crypto';

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
      minLength: [5, "Username should be atleast 5 characters"],
      maxLength: [50, "Username should be less than 50 characters"],
      unique: [true, "userName already exists, please choose a new one"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must atleast 8 Characters"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      ],
      select: false,
    },

    phone: {
      type: String,
      required: true,
      minLength: [10, "Invalid Phone number"],
    },
    github: {
      type: String,
      required: [true, "Github link is required"],
    },
    linkedin: {
      type: String,
      required: [true, "LinkedIn profile url is required"],
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    avatar: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    problemsSolved: {
      type: Number,
      default: 0,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
  comparePassword: async function (plainTextPassword) {
    return await bcrypt.compare(plainTextPassword, this.password);
  },
  generateJWTToken: function () {
    return jwt.sign(
      {
        id: this._id,
        role: this.role,
        email: this.email,
        problemsSolved: this.problemsSolved,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
  },
  generatePasswordToken : function() {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.forgotPasswordToken  = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000 // 15min from now

    return resetToken;  
  }
};

const User = mongoose.model("User", userSchema);

export default User;