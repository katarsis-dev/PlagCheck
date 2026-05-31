import jwt from "jsonwebtoken";
import { validateEnv } from "../config/config.js";

export const generateToken = (payload: object, type: "refresh" | "access") => {
  const expired = type === "refresh" ? "7d" : "1h";
  return jwt.sign(
    payload,
    type === "refresh"
      ? validateEnv().value.JWT_REFRESH_SECRET
      : validateEnv().value.JWT_ACCESS_SECRET,
    { expiresIn: expired },
  );
};
