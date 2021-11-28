import express from "express";
const appointmentRouter = express.Router();

appointmentRouter.post("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
appointmentRouter.get("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
appointmentRouter.get("/:appId", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
appointmentRouter.put("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default appointmentRouter;
