import { AppError } from "../../error/appError.js";
import { generateToken } from "../../lib/generateToken.js";
import {
  checkRefreshToken,
  removeRefreshToken,
} from "../../repository/authRepository.js";
import {
  loginService,
  registerService,
} from "../../services/auth/auth.service.js";

export const registerController = async (req: any, res: any, next: any) => {
  try {
    await registerService(req.body.username, req.body.password);
    return res.status(200).json({
      status: "success",
      message: "success add user data",
    });
  } catch (err) {
    return next(err);
  }
};

export const loginController = async (req: any, res: any, next: any) => {
  try {
    const result = await loginService(req.body.username, req.body.password);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      status: "success",
      message: "login success",
      token: result.accessToken,
    });
  } catch (err) {
    return next(err);
  }
};

export const refreshController = async (req: any, res: any, next: any) => {
  try {
    const refreshToken = req.refreshToken;
    const isAvailable = await checkRefreshToken(refreshToken);
    if (isAvailable.rows[0]) {
      const { id, username, expires_at } = isAvailable.rows[0];
      if (new Date(expires_at) < new Date()) {
        await removeRefreshToken(refreshToken);
        throw new AppError("jwt token invalid", 401);
      } else {
        const result = generateToken({ id: id, username: username }, "access");
        return res.status(200).json({
          status: "success",
          token: result,
        });
      }
    } else {
      throw new AppError("jwt token invalid", 401);
    }
  } catch (err) {
    return next(err);
  }
};
