import doctorModel from "./schema.js";
import createHttpError from "http-errors";
import { verifyJWT } from "../user/authentication/tools.js";

const DocJWtAuthenticateMiddle = async (req, res, next) => {
  console.log("im here");
  if (!req.headers.authorization) {
    next(
      createHttpError(404, `please provide a token in authorization header`)
    );
  } else {
    try {
      const token = req.headers.authorization.replace("Bearer ", "");
      const decodedToken = await verifyJWT(token);

      const doctor = await doctorModel.findById(decodedToken._id);
      //   console.log(user);
      if (doctor) {
        req.doctor = doctor;
        //console.log("jwttt", req.doctor);
        next();
      } else {
        next(createHttpError(404, `userId not found`));
      }
    } catch (error) {
      next(createHttpError(401, "Token not found"));
    }
  }
};
const JWtAuthenticateMiddle = async (req, res, next) => {
  console.log("im here");
  if (!req.headers.authorization) {
    next(
      createHttpError(404, `please provide a token in authorization header`)
    );
  } else {
    try {
      const token = req.headers.authorization.replace("Bearer ", "");
      const decodedToken = await verifyJWT(token);

      const user = await doctorModel.findById(decodedToken._id);
      //   console.log(user);
      if (user) {
        req.user = user;
        next();
      } else {
        next(createHttpError(404, `userId not found`));
      }
    } catch (error) {
      next(createHttpError(401, "Token not found"));
    }
  }
};
export default DocJWtAuthenticateMiddle;
