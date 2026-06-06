import Joi from "joi";
import { AppError } from "../error/appError.js";

const validateSchema = (schema: any) => (req: any, res: any, next: any) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  req.body = value;
  return next();
};

export default validateSchema;
