import createHttpError from "http-errors";

export const adminOnlyMiddleware = (req, res, next) => {
  if (req.user.role === "Admin") {
    next();
  } else {
    next(createHttpError(403, "Admins Only!"));
  }
};
export const doctorOnlyMiddleware = (req, res, next) => {
  if (req.doctor.role === "Doctor") {
    next();
  } else {
    next(createHttpError(403, "Doctor Only!"));
  }
};
