import express from "express";
import doctorModel from "./schema.js";
import appartmentModel from "../appointment/schema.js";
import DocJWtAuthenticateMiddle from "./jwt.js";
import { doctorOnlyMiddleware } from "../user/authentication/admin.js";
import { JWtAuthenticate } from "../user/authentication/oauth.js";
import { parseFile } from "../utils/cloudinary.js";
const doctorRouter = express.Router();
doctorRouter.get("/:docId", async (req, res, next) => {
  try {
    const doctor = await doctorModel
      .findById(req.params.docId)
      .populate("appointments");
    res.send(doctor);
  } catch (error) {
    next(error);
  }
});
doctorRouter.get("/", async (req, res, next) => {
  console.log("here here");
  try {
    const query = req.query;
    const doctors = await doctorModel
      .find({
        $or: [
          { specialization: query.search },
          { clinicLocation: query.search },
        ],
      })
      .populate()
      .limit(4);
    res.send(doctors);
  } catch (error) {
    next(error);
  }
});
doctorRouter.post(
  "/new",
  DocJWtAuthenticateMiddle,
  doctorOnlyMiddleware,
  async (req, res, next) => {
    try {
      const docId = req.doctor._id.toString();
      const newAppointment = {
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        doctor: docId,
      };
      console.log("objectt", newAppointment);
      const appointment = new appartmentModel(newAppointment);
      const newApp = await appointment.save();
      // const updateDoc = await doctorModel.findByIdAndUpdate(docId, {
      //   $push: { appointments: newApp._id },
      // });
      res.send(newApp);
    } catch (error) {
      next(error);
    }
  }
);
doctorRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await doctorModel.checkCredentials(email, password);
    if (user) {
      console.log(user);
      const { accessToken, refreshToken } = await JWtAuthenticate(user);
      res.send({ accessToken, refreshToken });
    } else {
      next(
        createHttpError(401, "credentials are not ok check again correctly")
      );
    }
  } catch (error) {
    next(error);
  }
});
doctorRouter.post(
  "/register",
  parseFile.single("image"),
  async (req, res, next) => {
    try {
      const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        //image: req.file.path,
        password: req.body.password,
      };
      const register = new doctorModel(req.body);
      const { firstName, lastName, email, image } = await register.save();
      res.send({ firstName, lastName, email, image });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);
doctorRouter.get("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
doctorRouter.put("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
export default doctorRouter;
