import multer from 'multer';


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${__dirname}/../../../tmp/images`);
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});

const uploadFile = multer({ storage });

export default uploadFile;
