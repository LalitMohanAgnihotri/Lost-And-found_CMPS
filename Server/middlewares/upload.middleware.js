import multer from "multer";
import {
  CloudinaryStorage,
} from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage =
  new CloudinaryStorage({
    cloudinary,
    params: async (
      req,
      file
    ) => ({
      folder: "lostfound",

      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp",
      ],

      resource_type: "image",

      public_id: `${
        Date.now()
      }-${Math.round(
        Math.random() * 1e9
      )}`,
    }),
  });

const fileFilter = (
  req,
  file,
  cb
) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (
    allowedMimeTypes.includes(
      file.mimetype
    )
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, PNG, WEBP images are allowed"
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize:
      5 * 1024 * 1024,
  },
});

export default upload;