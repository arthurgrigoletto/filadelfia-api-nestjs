import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookController } from '../controllers/book.controller';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';
import { Stock } from 'app/models/stock';
import { StockService } from 'app/services/stock.service';

@Module({
  imports: [SequelizeModule.forFeature([Book, Stock])],
  providers: [BookService, StockService],
  controllers: [BookController],
  exports: []
})
export class BookModule { }
