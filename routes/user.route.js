import { Router } from "express";
import signUp from "../controller/signup.controller.js";
import signin from "../controller/signin.controller.js";
import { deleteuser, google, signout } from "../controller/googlesignin.js";
import { Verifyuser } from "../middleware/middlewares.js";
import updateUser from "../controller/updateuser.controller.js";

const route = Router();

route.post("/signup", signUp);
route.post("/signin", signin);
route.post("/auth/google", google);
route.post("/update/:id", Verifyuser, updateUser);
route.delete("/delete/:id", Verifyuser, deleteuser);
route.get("/signout", signout);

export default route;
