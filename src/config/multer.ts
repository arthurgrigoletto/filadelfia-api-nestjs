require('dotenv').config();

import * as aws from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { diskStorage, Options } from 'multer';
import { randomBytes } from 'crypto';
import { resolve } from 'path';

const storageType = {
  local: diskStorage({
    destination: resolve('tmp', 'uploads'),
    filename: (req, file, cb) => {
      randomBytes(16, (err, hash) => {
        if (err) cb(err, null);

        const key = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, key);
      });
    }
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      randomBytes(16, (err, hash) => {
        if(err) cb(err);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, fileName);
      })
    }
  }),
}

const multerOptions: Options = {
  dest: resolve('tmp', 'uploads'),
  storage: storageType[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
};

export default multerOptions;
