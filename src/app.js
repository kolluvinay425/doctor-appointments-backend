import express from "express";
import path from "path";
import cors from "cors";
import list from "express-list-endpoints";
import {
  forbiddenHandler,
  catchAllHandler,
  unauthorizedHandler,
  notFoundHandler,
} from "./errorHandlers.js";
import userRouter from "./user/index.js";
import doctorRouter from "./doctor/index.js";
import hospitalRouter from "./hospital/index.js";
import appointmentRouter from "./appointment/index.js";
import mongoose from "mongoose";

const port = process.env.PORT || 3001;
const server = express();
const whiteList = [
  "https://doctor-appointments-frontend.vercel.app",
  "http://localhost:3000",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.some((allowedUrl) => allowedUrl === origin)) {
      callback(null, true);
    } else {
      const error = new Error("Not allowed by cors!");
      error.status = 403;
      callback(error);
    }
  },
};
const publicFolderPath = path.join(process.cwd(), "public");
server.use(express.static(publicFolderPath));
server.use(cors(corsOptions));
server.use(express.json());

//Error errorHandlers
server.use(forbiddenHandler);
server.use(unauthorizedHandler);
server.use(catchAllHandler);
server.use(notFoundHandler);

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
