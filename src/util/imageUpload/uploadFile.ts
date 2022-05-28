import multer from 'multer';
import path from 'path';

const localStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${__dirname}/../../../tmp`);
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 10000000)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const uploadFile = multer({ storage: localStorage });

export default uploadFile;
