import Jwt from "jsonwebtoken";
export const JWtAuthenticate = async (user) => {
  //we are calling this function at users login route to generate tokens

  const accessToken = await generateJWT({ _id: user._id });
  const refreshToken = await generateRefreshJWT({ _id: user._id });
  console.log("_id", { _id: user._id });
  console.log("accessToken", accessToken);
  console.log("refreshToken", refreshToken);
  return { accessToken, refreshToken };
};

const generateJWT = (payload) =>
  new Promise((resolve, reject) =>
    Jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1 day" },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    )
  );

const generateRefreshJWT = (payload) =>
  new Promise((resolve, reject) =>
    Jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "10m" },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    )
  );

export const verifyJWT = (token) =>
  //we are calling this function from every route that need
  //user authentication so that only verifed user can able to perform operations
  new Promise((res, rej) =>
    Jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) rej(err);
      else res(decodedToken);
    })
  );
