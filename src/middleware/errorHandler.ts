export const errorHandler = (err: any, req: any, res: any, next: any) => {
  console.error(err);
  return res.status(err.status || 500).json({
    status: "failed",
    message: err.message || "internal server error",
  });
};
