// middlewares/error.middleware.js

export const notFound = (
  req,
  res,
  next
) => {
  res.status(404);
  next(
    new Error(
      `Route not found: ${req.originalUrl}`
    )
  );
};

export const errorHandler = (
  err,
  req,
  res,
  next
) => {
  const statusCode =
    res.statusCode !== 200
      ? res.statusCode
      : 500;

  // Multer / upload errors
  if (
    err.message?.includes(
      "Only JPG"
    )
  ) {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (
    err.code ===
    "LIMIT_FILE_SIZE"
  ) {
    return res.status(400).json({
      message:
        "File too large (max 5MB)",
    });
  }

  res.status(statusCode).json({
    message:
      err.message ||
      "Server Error",
    stack:
      process.env.NODE_ENV ===
      "production"
        ? undefined
        : err.stack,
  });
};