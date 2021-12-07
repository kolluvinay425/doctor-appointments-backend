import mongoose from "mongoose";

const { model, Schema } = mongoose;

const hospitalSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
    },

    doctors: [
      {
        type: Schema.Types.ObjectId,
        ref: "doctor",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export default model("hospital", hospitalSchema);
