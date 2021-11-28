import express from "express";
const hospitalRouter = express.Router();
hospitalRouter.post("/", async (req, res, next) => {});
hospitalRouter.get("/", async (req, res, next) => {});
hospitalRouter.get("/:hosId", async (req, res, next) => {});
hospitalRouter.put("/", async (req, res, next) => {});
export default hospitalRouter;
