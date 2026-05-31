import {
  addUsers,
  checkUsersByUsername,
} from "../../repository/userRepository.js";
import { AppError } from "../../error/appError.js";
import { generateToken } from "../../lib/generateToken.js";
import bcrypt from "bcrypt";
import { validateEnv } from "../../config/config.js";
import { addRefreshToken } from "../../repository/authRepository.js";

export const registerService = async (username: string, password: string) => {
  try {
    const result = await checkUsersByUsername(username);
    if (result.rowCount) {
      throw new AppError("username already exist", 401);
    }
    await addUsers(username, password);
  } catch (err: any) {
    throw err;
  }
};

export const loginService = async (username: string, password: string) => {
  try {
    const result = await checkUsersByUsername(username);
    const user = result.rows[0];
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const accessToken = generateToken(
          { id: user.id, username: username },
          "access",
        );
        const refreshToken = generateToken(
          { id: user.id, username: username },
          "refresh",
        );
        await addRefreshToken(user.id, refreshToken);

        return {
          accessToken,
          refreshToken,
        };
      } else {
        throw new AppError("password incorrect", 401);
      }
    } else {
      throw new AppError("username incorrect", 404);
    }
  } catch (err: any) {
    throw err;
  }
};
