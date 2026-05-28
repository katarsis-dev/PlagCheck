import multer from "multer";

const storage = multer.memoryStorage();
const allowedDocx = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "plain/txt",
];
const fileFilter = (req: any, file: any, cb: any) => {
  if (allowedDocx.includes(file.mimetype)) {
    return cb(null, true);
  }
  return cb(null, false);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5242880 },
}).array("documents", 2);
