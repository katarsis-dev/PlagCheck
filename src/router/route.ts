import express from "express";
import { upload } from "../config/multer.js";
import { uploadFilesController } from "../controller/file.controller.js";

export const router = express.Router();

router.get("/", (req, res) => {});

router.post("/file", upload, uploadFilesController);
