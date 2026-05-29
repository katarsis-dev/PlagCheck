import express from "express";
import { upload } from "../config/multer.js";
import { uploadFilesController } from "../controller/file.controller.js";
import validateSchema from "../middleware/schemaValidation.js";
import { authSchema } from "../schema/body.schema.js";
import { registerController } from "../controller/auth.controller.js";

export const router = express.Router();

router.get("/", (req, res) => {});

router.post("/file", upload, uploadFilesController);
router.post("/auth/register", validateSchema(authSchema), registerController);
router.post("/auth/register", validateSchema(authSchema), registerController);