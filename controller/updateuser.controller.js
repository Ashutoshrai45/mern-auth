import { Errorhandler } from "../middleware/middlewares.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

const updateUser = async (req, res, next) => {
  console.log("Request Params:", req.params);
  console.log("Request Body:", req.body);

  if (req.user.id !== req.params.id)
    return next(Errorhandler(401, "you can only update your account"));
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 6);
    }
    const updateduser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          fullname: req.body.fullname,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateduser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export default updateUser;
