import multer from 'multer';

/* eslint-disable camelcase */
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import dotenv from 'dotenv';
import ServerError from '../error/ServerError';

dotenv.config();

const {
  CLOUDINARY_CLOUD_NAME: cloud_name,
  CLOUDINARY_KEY: api_key,
  CLOUDINARY_SECRET: api_secret,
} = process.env;

if (!(cloud_name && api_key && api_secret)) {
  throw new ServerError(
    'The cloudinary credentials were not found in the environment variables.',
    500,
  );
}

cloudinary.config({ cloud_name, api_key, api_secret });

// @ts-expect-error
const storage = new CloudinaryStorage({ cloudinary, params: { folder: 'BeerApp' } });

const uploadFile = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg')) {
      cb(
        new ServerError('Invalid file type. Only .png and .jpg files are accepted.', 400),
      );
    }
    // Upload the file to cloud service
    cb(null, true);
  },
});

export default uploadFile;
