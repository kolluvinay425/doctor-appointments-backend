import mongoose from "mongoose";

const { model, Schema } = mongoose;

const doctorSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
  },
  specialization: {
    type: String,
    required: true,
  },
  clinicLocation: {
    type: String,
  },
  hospital: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hospital",
      default: [],
    },
  ],
  appointments: [
    {
      type: Schema.Types.objectId,
      ref: "appointment",
      default: [],
    },
  ],
});

export default model("doctor", doctorSchema);
