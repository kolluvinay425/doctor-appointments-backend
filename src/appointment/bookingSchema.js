import mongoose from "mongoose";

const { model, Schema } = mongoose;

const bookingSchema = new Schema(
  {
    appointmentDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
      default: {},
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: {},
    },
  },
  { timestamps: true }
);

export default model("booking", bookingSchema);
