import * as multer from 'multer';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync('uploads');
    } catch (e) {
      console.error('Directory already exists or cannot be created:', e);
    }

    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + uuidv4() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

export { storage };
