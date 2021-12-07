import express from "express";
import hospitalModel from "./schema.js";
const hospitalRouter = express.Router();
hospitalRouter.post("/", async (req, res, next) => {
  try {
    const newHospital = await hospitalModel.create(req.body).save();
    res.send({ newHospital });
  } catch (error) {
    next(error);
  }
});
hospitalRouter.get("/", async (req, res, next) => {
  try {
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
