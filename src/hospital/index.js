import express from "express";
import hospitalModel from "./schema.js";
import { adminOnlyMiddleware } from "../user/authentication/admin.js";
import JWtAuthenticateMiddle from "../user/authentication/jwt.js";
import { escapeRegex } from "../doctor/index.js";
const hospitalRouter = express.Router();
hospitalRouter.post(
  "/",
  JWtAuthenticateMiddle,
  adminOnlyMiddleware,
  async (req, res, next) => {
    try {
      const newHospital = await hospitalModel.create(req.body);
      const { name, location, image, doctors } = await newHospital.save();
      res.send({ name, location, image, doctors });
    } catch (error) {
      next(error);
    }
  }
);

hospitalRouter.get("/", async (req, res, next) => {
  console.log("here here");
  try {
    const query = req.query.search;
    const regex = new RegExp(escapeRegex(query), "gi");

    const hospitals = await hospitalModel
      .find({
        $or: [{ name: regex }, { city: regex }, { location: regex }],
      })
      .populate("doctors");
    if (query === "") {
      res.send([]);
    }
    res.send(hospitals);
  } catch (error) {
    next(error);
  }
});
hospitalRouter.get("/all", async (req, res, next) => {
  try {
    const doctors = await hospitalModel.find();
    res.send(doctors);
  } catch (error) {
    next(error);
  }
});
hospitalRouter.get("/:hosId", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
hospitalRouter.put("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default hospitalRouter;
