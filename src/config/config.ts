import Joi from "joi";
import dotenv from "dotenv";
dotenv.config();

const envScheme = Joi.object({
  PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().required(),
  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
});

const getEnv = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
};

export const validateEnv = () => {
  return envScheme.validate(getEnv);
};
