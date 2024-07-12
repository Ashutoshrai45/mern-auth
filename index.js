import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import Userroute from "./routes/user.route.js";
import { Errormiddleware } from "./middleware/middlewares.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const Port = process.env.PORT;
app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => console.log("Database is connected"))
  .catch((err) => {
    console.log("database error");
  });

app.use(express.json());
app.use(cookieParser());
app.use("/", Userroute);
app.use(Errormiddleware);

app.listen(Port, () => console.log("server is connected"));
