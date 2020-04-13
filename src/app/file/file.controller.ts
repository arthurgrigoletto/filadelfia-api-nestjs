import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Res, Delete } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import multerConfig from '@config/multer';

@Controller('files')
export class FileController {
  constructor(public fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  public async uploadFile(@UploadedFile() file) {
    const { originalname: name, filename, key, size, location: url } = file;

    const fileCreated = await this.fileService.store({
      name,
      key: key ?? filename,
      size,
      url,
    })

    return fileCreated;
  }

  @Delete(':fileId')
  public async destroyFile(@Param('fileId') fileId: string) {
    await this.fileService.destroy(fileId);
  }

  @Get('/:fileName')
  public getFile(@Param('fileName') fileName: string, @Res() res: Response) {
    res.sendFile(fileName, { root: 'tmp/uploads' })
  }
}
