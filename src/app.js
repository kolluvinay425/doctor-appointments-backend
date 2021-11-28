import express from "express";
import list from "express-list-endpoints";
import userRouter from "./user/index.js";
import doctorRouter from "./doctor/index.js";
import hospitalRouter from "./hospital/index.js";
import appointmentRouter from "./appointment/index.js";

const port = 3001 || process.env.PORT;
const server = express();
server.use(express.json());

server.use("/user", userRouter);
server.use("/appointment", appointmentRouter);
server.use("/hospital", hospitalRouter);
server.use("/doctor", doctorRouter);

server.listen(port, () => {
  console.table(list(server));
  console.log(`server running on port ${port}`);
});
