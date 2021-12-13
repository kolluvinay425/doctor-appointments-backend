import express from "express";
import createHttpError from "http-errors";
import appointmentModel from "./schema.js";
import userModel from "../user/schema.js";
import bookingModel from "./bookingSchema.js";
import doctorModel from "../doctor/schema.js";
import { sendMail } from "../utils/mail.js";
import { doctorOnlyMiddleware } from "../user/authentication/admin.js";
import { generateAppointmentPDF } from "../utils/pdf.js";
import JWtAuthenticateMiddle from "../user/authentication/jwt.js";

const appointmentRouter = express.Router();

appointmentRouter.post(
  "/:appId",
  JWtAuthenticateMiddle,
  async (req, res, next) => {
    console.log("request for appointment booking", req.user);
    try {
      const appointment = await appointmentModel.findById(req.params.appId); //geting the appointment which need to book
      if (appointment) {
        const booking = {
          appointmentDate: appointment.date,
          startTime: appointment.startTime,
          endTime: appointment.endTime,
          doctorId: appointment.doctor.toString(),
          userId: req.user._id.toString(),
        };
        const newBooking = new bookingModel(booking);
        const newB = await newBooking.save();

        if (newB) {
          const updateUser = await userModel.findByIdAndUpdate(req.user._id, {
            $push: { bookings: newB._id },
          });
          const updateDoc = await doctorModel.findByIdAndUpdate(
            appointment.doctor.toString(),
            {
              $push: { bookings: newB._id },
            }
          );
          const pdfDoc = await generateAppointmentPDF(newB);
          const email = await sendMail(newB._id, req.user.email);
          const deleteAppointment = await appointmentModel.findByIdAndDelete(
            req.params.appId
          );
          res.send("appointment booked successfully");
        }
      } else {
        next(createHttpError(404, `app Id ${req.params.appId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);
//find appointments by query
appointmentRouter.get("/", async (req, res, next) => {
  console.log("here here");
  try {
    const query = req.query;
    const doctorAppointments = await appointmentModel
      .find({
        $and: [{ doctor: query.docId }, { date: query.date }],
      })
      .limit(4);
    res.send(doctorAppointments);
  } catch (error) {
    next(error);
  }
});
appointmentRouter.get("/mail/:appId", async (req, res, next) => {
  try {
    const appointment = await appointmentModel.findById(req.params.appId); //geting the appointment which need to book
    if (appointment) {
      const pdfDoc = await generateAppointmentPDF(appointment);
      await sendMail();
      res.send("success");
    }
  } catch (error) {
    next(error);
  }
});
appointmentRouter.get("/:appId", async (req, res, next) => {
  try {
    const { _id, date, startTime, endTime, doctor } = await appointmentModel
      .findById(req.params.appId)
      .populate();
    res.send({ _id, date, startTime, endTime, doctor });
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
