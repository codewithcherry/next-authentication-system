import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  firstname: {
    type: String,
    trim: true,
    maxlength: 50
  },
  lastname: {
    type: String,
    trim: true,
    maxlength: 50
  },
  role: {
    type: String,
    enum: ["user", "admin", "super-admin", "moderator"],
    default: "user"
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    index: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    trim: true,
    default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    match: [/^https?:\/\/.+/, "Invalid URL format"]
  },
 
  isVerified: {
    type: Boolean,
    default: false
  },
  
  resetTokenExpiry: {
    type: Date
  }
}, { timestamps: true });

// Check if the model is already defined in Mongoose's internal registry
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User; 