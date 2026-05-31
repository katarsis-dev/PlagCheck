import express from "express";
import { upload } from "../config/multer.js";
import { uploadFilesController } from "../controller/file.controller.js";
import validateSchema from "../middleware/schemaValidation.js";
import { authSchema } from "../schema/body.schema.js";
import {
  loginController,
  refrehController,
  registerController,
} from "../controller/auth/auth.controller.js";
import { verifAuth, verifRefreshToken } from "../middleware/auth.middleware.js";

export const router = express.Router();

router.post("/auth/register", validateSchema(authSchema), registerController);
router.post("/auth/login", validateSchema(authSchema), loginController);
router.post("/auth/refresh", verifRefreshToken, refrehController);

router.post("/file/bow", upload, uploadFilesController);

