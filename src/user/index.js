import express from "express";
import { parseFile } from "../utils/cloudinary.js";
import { JWtAuthenticate } from "./authentication/tools.js";
import JWtAuthenticateMiddle from "./authentication/jwt.js";
import userModel from "./schema.js";
import createHttpError from "http-errors";
const userRouter = express.Router();
userRouter.post("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
userRouter.get("/me", JWtAuthenticateMiddle, async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id).populate("bookings");
    if (user) res.send(user);
  } catch (error) {
    next(error);
  }
});
userRouter.get("/:userId", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
userRouter.post(
  "/update-profile-image",
  parseFile.single("image"),
  JWtAuthenticateMiddle,
  async (req, res, next) => {
    console.log("user", req.user);

    try {
      const myObj = { image: req.file.path };
      const user = await userModel.findByIdAndUpdate(req.user._id, myObj, {
        new: true,
      });
      console.log(user);
      res.send(user);
    } catch (error) {
      res.send(error);
    }
  }
);
userRouter.post(
  "/register",
  parseFile.single("image"),
  async (req, res, next) => {
    try {
      const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        image: req.file.path,
        password: req.body.password,
      };
      const register = new userModel(newUser);
      const { firstName, lastName, email, image, role } = await register.save();
      res.send({ firstName, lastName, email, image, role });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.checkCredentials(email, password);
    if (user) {
      const { accessToken, refreshToken } = await JWtAuthenticate(user);
      res.send({ accessToken, refreshToken });
    } else {
      next(
        createHttpError(401, "credentials are not ok check again correctly")
      );
    }
  } catch (error) {
    next(error);
  }
});

export default userRouter;
