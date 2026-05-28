import Joi from "joi";
import dotenv from "dotenv";
dotenv.config();

const envScheme = Joi.object({
  PORT: Joi.number().required(),
});

const getEnv = {
  PORT: process.env.PORT,
};

export const validateEnv = () => {
  return envScheme.validate(getEnv);
};
