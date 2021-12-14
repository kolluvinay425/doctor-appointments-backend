import express from "express";
import doctorModel from "./schema.js";
import appointmentModel from "../appointment/schema.js";
import DocJWtAuthenticateMiddle from "./jwt.js";
import { doctorOnlyMiddleware } from "../user/authentication/admin.js";
import { JWtAuthenticate } from "../user/authentication/oauth.js";
import { parseFile } from "../utils/cloudinary.js";
import createHttpError from "http-errors";
const doctorRouter = express.Router();
doctorRouter.get("/:docId", async (req, res, next) => {
  try {
    const doctor = await doctorModel.findById(req.params.docId);
    res.send(doctor);
  } catch (error) {
    next(error);
  }
});
doctorRouter.get("/", async (req, res, next) => {
  try {
    const doctors = await doctorModel.find();
    res.send(doctors);
  } catch (error) {
    next(error);
  }
});
doctorRouter.get("/", DocJWtAuthenticateMiddle, async (req, res, next) => {
  try {
    console.log(req.doctor);
    const user = await doctorModel
      .findById(req.doctor._id.toString())
      .populate("bookings");
    if (user) res.send(user);
  } catch (error) {
    next(error);
  }
});
doctorRouter.get("/search/dm", async (req, res, next) => {
  //search doctors based on hospital name
  console.log("here here");
  try {
    const query = req.query;
    const doctors = await doctorModel.find({ hospital: query.hospital });
    res.send(doctors);
  } catch (error) {
    next(error);
  }
});
doctorRouter.get("/search/find", async (req, res, next) => {
  //search dctors by specialization or clinicLocation or hospital
  console.log("here here");
  try {
    const query = req.query.search;
    const regex = new RegExp(escapeRegex(query), "gi");
    const doctors = await doctorModel.find({
      $or: [
        { specialization: regex },
        { clinicLocation: regex },
        { hospital: regex },
        { firstName: regex },
        { lastName: regex },
      ],
    });
    if (query === "") {
      res.send([]);
    }
    res.send(doctors);
  } catch (error) {
    next(error);
  }
});

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
  "/new",
  DocJWtAuthenticateMiddle,
  doctorOnlyMiddleware,
  async (req, res, next) => {
    try {
      const docId = req.doctor._id;
      const newAppointment = {
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        doctor: docId,
      };
      console.log("objectt", newAppointment);
      const appointment = new appointmentModel(newAppointment);
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

doctorRouter.post(
  "/register",
  parseFile.single("image"),
  async (req, res, next) => {
    try {
      const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        hospital: req.body.hospital,
        role: "Doctor",
        //image: req.file.path,
        specialization: req.body.specialization,
        clinicLocation: req.body.clinicLocation,
        password: req.body.password,
      };
      const register = new doctorModel(newUser);
      //console.log(newUser);
      const data = await register.save();
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

doctorRouter.put("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
export default doctorRouter;
export const escapeRegex = (query) => {
  return query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
