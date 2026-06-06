import { AppError } from "../error/appError.js";

export const bowController_secure = (req: any, res: any, next: any) => {
  try {
    const files = req.files;
    return res.status(200).json({
      file: files,
    });
  } catch (error) {
    return next(error);
  }
};
