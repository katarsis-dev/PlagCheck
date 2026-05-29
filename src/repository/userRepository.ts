import client from "../config/db.js";
import { AppError } from "../error/appError.js";
import bcrypt from "bcrypt";

export const checkUsersByUsername = async (username: string) => {
  return await client.query("SELECT * FROM users WHERE username = ($1)", [
    username,
  ]);
};

export const addUsers = async (username: string, password: string) => {
  try {
    const hash = bcrypt.hashSync(password, 10);
    const result = await checkUsersByUsername(username);
    if (result.rowCount) {
      throw new AppError("username already exist", 401);
    }

    return await client.query(
      "INSERT INTO users (username,password) VALUES ($1,$2)",
      [username, hash],
    );
  } catch (error: any) {
    throw new AppError(
      error.message ?? "failed to add users",
      error.status ?? 500,
    );
  }
};
