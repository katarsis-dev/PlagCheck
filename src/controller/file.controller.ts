import { AppError } from "../error/appError.js";

export const uploadFilesController = (req: any, res: any, next: any) => {
  const files = req.files;
  if (files) {
    return res.status(200).json({
      file: files,
    });
  }
  next(new AppError("failed to upload", 500));
};
