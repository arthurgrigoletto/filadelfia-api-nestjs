import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from 'app/models/file';
import { FileService } from 'app/services/file.service';
import { FileController } from 'app/controllers/file.controller';

@Module({
  imports: [SequelizeModule.forFeature([File])],
  providers: [FileService],
  controllers: [FileController],
  exports: []
})
export class FileModule { }
