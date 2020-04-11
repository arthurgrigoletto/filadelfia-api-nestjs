import { Table, Column, Model, DataType, BeforeCreate, BeforeDestroy } from 'sequelize-typescript';
import * as aws from 'aws-sdk';
import { promisify } from 'util';
import { resolve } from 'path';
import { unlink } from 'fs';

const s3 = new aws.S3();

@Table({ tableName: 'files' })
export class File extends Model<File> {
  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  key:string;

  @Column({ type: DataType.INTEGER })
  size: number;

  @Column({ type: DataType.STRING })
  url: string;

  @BeforeCreate
  static buildUrl(file: File) {
    if(!file.url) {
      file.url = `${process.env.APP_URL}/files/${file.key}`;
    }
  }

  @BeforeDestroy
  static deleteFile(file: File) {
    if(process.env.STORAGE_TYPE === 's3') {
      return s3.deleteObject({
        Bucket: process.env.AWS_BUCKET,
        Key: file.key
      })
      .promise();
    }

    return promisify(unlink)(resolve(__dirname, '..', '..', 'tmp', 'uploads', file.key))
  }
}
