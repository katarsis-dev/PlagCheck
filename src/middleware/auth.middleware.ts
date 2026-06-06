import jwt from "jsonwebtoken";
import { validateEnv } from "../config/config.js";

export const verifAuth = (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const result = jwt.verify(token, validateEnv().value.JWT_ACCESS_SECRET);

    req.user = result;
    return next();
  } catch (err) {
    return next(err);
  }
};

export const verifRefreshToken = (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.refreshToken;
    const result = jwt.verify(token, validateEnv().value.JWT_REFRESH_SECRET);

    req.authorization = result;
    req.refreshToken = token;
    return next();
  } catch (err) {
    return next(err);
  }
};
