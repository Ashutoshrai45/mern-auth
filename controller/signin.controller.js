import { Errorhandler } from "../middleware/middlewares.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const Validuser = await User.findOne({ email });
    if (!Validuser) return next(Errorhandler(404, "User not found"));
    const Validpassword = bcrypt.compareSync(password, Validuser.password);
    if (!Validpassword) return next(Errorhandler(401, "Wrong credentials"));
    const token = jwt.sign({ id: Validuser._id, email }, "ashutoshrai", {
      expiresIn: 60 * 60,
    });
    const { password: hashedpassword, ...rest } = Validuser._doc;
    res.cookie("token", token, { httpOnly: true }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
export default signin;
