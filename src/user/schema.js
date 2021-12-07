import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { model, Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
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
    role: { type: String, default: "User", enum: ["User", "Admin"] },

    password: {
      type: String,
      required: function () {
        return !Boolean(this.googleId);
      },
    },
    googleId: {
      type: String,
      required: function () {
        return !Boolean(this.password);
      },
    },
    refreshToken: {
      type: String,
    },
    bookings: [{ type: Schema.Types.ObjectId, ref: "booking" }],
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  const newUser = this;
  const plainPw = newUser.password;
  if (newUser.isModified("password")) {
    newUser.password = await bcrypt.hash(plainPw, 11);
    next();
  }
});

userSchema.methods.toJSON = function () {
  const userDocument = this;
  const userObject = userDocument.toObject();
  delete userObject.password;
  delete userObject._v;
  return userObject;
};
userSchema.statics.checkCredentials = async function (email, plainPW) {
  // 1. find the user by email
  const user = await this.findOne({ email }); // "this" refers to UserModel

  if (user) {
    // 2. if the user is found we are going to compare plainPW with hashed one
    const isMatch = await bcrypt.compare(plainPW, user.password);
    // 3. Return a meaningful response
    if (isMatch) return user;
    else return null; // if the pw is not ok I'm returning null
  } else return null; // if the email is not ok I'm returning null as well
};
export default model("user", userSchema);
