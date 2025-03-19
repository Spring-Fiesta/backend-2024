import { Schema, model } from "mongoose";
import pkg from 'bcryptjs';
const { genSalt, hash } = pkg;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    salt: {
      type: String,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    vote: String,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  const password = this.password

  if (!user.isModified("password")) return;
  const salt = await genSalt(10);
  const hashPassword = await hash(password, salt);

  this.salt = salt;
  this.password = hashPassword;
  next();
});

const User = model("user", userSchema);

export default User;