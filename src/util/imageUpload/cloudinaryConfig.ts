import multer from 'multer';

/* eslint-disable camelcase */
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import ServerError from '../error/ServerError';

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

const cloudinaryConfig = { cloudinary, storage };

export default cloudinaryConfig;
