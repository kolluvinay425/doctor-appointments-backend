import express from "express";
import { parseFile } from "../utils/cloudinary.js";
import { JWtAuthenticate } from "./authentication/tools.js";
import JWtAuthenticateMiddle from "./authentication/jwt.js";
import userModel from "./schema.js";
import { doctorOnlyMiddleware } from "./authentication/admin.js";
const userRouter = express.Router();
userRouter.post("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
userRouter.get("/me", JWtAuthenticateMiddle, async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
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
userRouter.put("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
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
      const { firstName, lastName, email, image } = await register.save();
      res.send({ firstName, lastName, email, image });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);
userRouter.post(
  "/register/doctor",
  parseFile.single("image"),
  async (req, res, next) => {
    try {
      const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        //image: req.file.path,
        role: "Doctor",
        password: req.body.password,
      };
      const register = new userModel(newUser);
      const { firstName, lastName, email, image } = await register.save();
      res.send({ firstName, lastName, email, image });
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
