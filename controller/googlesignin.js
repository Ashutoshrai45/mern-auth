import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Errorhandler } from "../middleware/middlewares.js";

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, email: req.body.email },
        "ashutoshrai",
        {
          expiresIn: 60 * 60,
        }
      );
      const { password: hashedpassword, ...rest } = user._doc;
      res.cookie("token", token, { httpOnly: true }).status(200).json(rest);
    } else {
      const generatepassword =
        Math.random().toString(36).slice(-9) +
        Math.random().toString(36).slice(-9);
      const hashedpassword = bcrypt.hashSync(generatepassword, 8);
      const newUser = await User.create({
        fullname: req.body.name,
        email: req.body.email,
        profilePicture: req.body.photo,
        password: hashedpassword,
      });
      const token = jwt.sign(
        { id: newUser._id, email: req.body.email },
        "ashutoshrai",
        {
          expiresIn: "1h",
        }
      );
      const { password, ...rest } = newUser._doc;
      res.cookie("token", token, { httpOnly: true }).status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};

// deleteuser

export const deleteuser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(Errorhandler(401, "you can delete only your account"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user is deleted succesfully");
  } catch (error) {
    next(error);
  }
};

// signout

export const signout = (req, res) => {
  res.clearCookie("token").status(200).json("Signout successfull");
};
