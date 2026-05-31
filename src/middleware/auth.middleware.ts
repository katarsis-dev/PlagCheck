import jwt from "jsonwebtoken";
import { validateEnv } from "../config/config.js";

export const verifAuth = (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const result = jwt.verify(token, validateEnv().value.JWT_ACCESS_SECRET);

    req.user = result;
    next();
  } catch (err) {
    next(err);
  }
};

export const verifRefreshToken = (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.refreshToken;
    const result = jwt.verify(token, validateEnv().value.JWT_REFRESH_SECRET);

    req.refreshToken = token;
    next();
  } catch (err) {
    next(err);
  }
};
