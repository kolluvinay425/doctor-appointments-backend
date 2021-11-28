import express from "express";
import cors from "cors";
import list from "express-list-endpoints";
import {
  forbiddenHandler,
  catchAllHandler,
  unauthorizedHandler,
} from "./errorHandlers.js";
import userRouter from "./user/index.js";
import doctorRouter from "./doctor/index.js";
import hospitalRouter from "./hospital/index.js";
import appointmentRouter from "./appointment/index.js";
import mongoose from "mongoose";

const port = 3001 || process.env.PORT;
const server = express();
server.use(express.json());
server.use(cors());

//Error errorHandlers
server.use(forbiddenHandler);
server.use(unauthorizedHandler);
server.use(catchAllHandler);

//Routes
server.use("/user", userRouter);
server.use("/appointment", appointmentRouter);
server.use("/hospital", hospitalRouter);
server.use("/doctor", doctorRouter);

mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});
server.listen(port, () => {
  console.table(list(server));
  console.log(`server running on port ${port}`);
});
server.on("error", (error) =>
  console.log(`❌ Server is not running due to : ${error}`)
);
