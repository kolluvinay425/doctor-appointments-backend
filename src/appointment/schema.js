import mongoose from "mongoose";

const { model, Schema } = mongoose;

const appointmentSchema = new Schema(
  {
    date: {
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
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
      default: {},
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default model("appointment", appointmentSchema);
