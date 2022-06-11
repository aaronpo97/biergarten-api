import multer from 'multer';
import ServerError from '../error/ServerError';
import cloudinaryConfig from './cloudinaryConfig';

const { storage } = cloudinaryConfig;
/** Helper function for uploading an image using multer. */
const uploadImage = multer({
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

export default uploadImage;
