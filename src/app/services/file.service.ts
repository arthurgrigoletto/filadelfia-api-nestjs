import { Injectable } from '@nestjs/common';
import { File } from '../models/file';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFileDto } from '../validators/create-file.dto';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File) private readonly fileModel: typeof File
  ) { }

  public async store(fileData: CreateFileDto): Promise<File> {
    return this.fileModel.create(fileData);
  }
}
