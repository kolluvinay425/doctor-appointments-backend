import express from "express";
const userRouter = express.Router();
userRouter.post("/", async (req, res, next) => {});
userRouter.get("/", async (req, res, next) => {});
userRouter.get("/:userId", async (req, res, next) => {});
userRouter.put("/", async (req, res, next) => {});
export default userRouter;
