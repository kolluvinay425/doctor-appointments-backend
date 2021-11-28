import express from "express";
const appointmentRouter = express.Router();

appointmentRouter.post("/", async (req, res, next) => {});
appointmentRouter.get("/", async (req, res, next) => {});
appointmentRouter.get("/:appId", async (req, res, next) => {});
appointmentRouter.put("/", async (req, res, next) => {});

export default appointmentRouter;
