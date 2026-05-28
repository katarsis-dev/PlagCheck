export const uploadFilesController = (req: any, res: any) => {
  const files = req.files;
  if (files) {
    return res.status(200).json({
      file: files,
    });
  }
  return res.status(500).json({
    status: "failed",
    message: "failed to upload",
  });
};
