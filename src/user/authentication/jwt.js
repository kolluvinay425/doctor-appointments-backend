import userModel from "../schema.js";
import createHttpError from "http-errors";
import { verifyJWT } from "./tools.js";

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

      const user = await userModel.findById(decodedToken._id);
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
export default JWtAuthenticateMiddle;
