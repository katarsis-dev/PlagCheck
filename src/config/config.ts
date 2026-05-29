import Joi from "joi";
import dotenv from "dotenv";
dotenv.config();

const envScheme = Joi.object({
  PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().required(),
});

const getEnv = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
};

export const validateEnv = () => {
  return envScheme.validate(getEnv);
};
