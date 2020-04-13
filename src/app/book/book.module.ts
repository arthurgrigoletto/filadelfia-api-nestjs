import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { StockService } from '../stock/stock.service';
import { File } from '../file/file.entity';
import { FileService } from '../file/file.service';
import { Stock } from '../stock/stock.entity';
import { configService } from '../services/config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, File, Stock]),
    CacheModule.register(configService.getRedisConfig()),
  ],
  providers: [BookService, FileService, StockService],
  controllers: [BookController],
  exports: [],
})
export class BookModule {}
