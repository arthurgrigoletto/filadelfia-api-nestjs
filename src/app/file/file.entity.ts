import { Entity, Column, BeforeInsert, BeforeRemove } from 'typeorm';
import * as aws from 'aws-sdk';
import { promisify } from 'util';
import { resolve } from 'path';
import { unlink } from 'fs';
import { BaseEntity } from '../models/base.entity';

const s3 = new aws.S3();

@Entity({ name: 'files' })
export class File extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  key:string;

  @Column({ type: 'integer' })
  size: number;

  @Column({ type: 'varchar' })
  url: string;

  @BeforeInsert()
  buildUrl() {
    if(!this.url) {
      this.url = `${process.env.APP_URL}/files/${this.key}`;
    }
  }

  @BeforeRemove()
  deleteFile() {
    if(process.env.STORAGE_TYPE === 's3') {
      return s3.deleteObject({
        Bucket: process.env.AWS_BUCKET,
        Key: this.key
      })
      .promise();
    }

    return promisify(unlink)(resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', this.key))
  }
}
