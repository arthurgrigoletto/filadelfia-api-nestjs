import { Injectable } from '@nestjs/common';
import { File } from './file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private readonly fileRepo: Repository<File>
  ) { }

  public async store(fileData: CreateFileDto): Promise<File> {
    const file = this.fileRepo.create(fileData);
    return this.fileRepo.save(file);
  }

  public async destroy(fileId: string) {
    const file = await this.fileRepo.findOne(fileId)
    await this.fileRepo.remove([file]);
  }
}
