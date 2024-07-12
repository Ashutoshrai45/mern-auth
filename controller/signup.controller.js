import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const signUp = async (req, res, next) => {
  const { fullname, email, password } = req.body;
  const hashedpassword = bcrypt.hashSync(password, 6);
  try {
    const newUser = await User.create({
      fullname,
      email,
      password: hashedpassword,
    });
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    next(error);
  }
};

export default signUp;
