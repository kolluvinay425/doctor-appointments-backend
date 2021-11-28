import express from "express";
const doctorRouter = express.Router();
doctorRouter.post("/", async (req, res, next) => {});
doctorRouter.get("/", async (req, res, next) => {});
doctorRouter.get("/:docId", async (req, res, next) => {});
doctorRouter.put("/", async (req, res, next) => {});
export default doctorRouter;
