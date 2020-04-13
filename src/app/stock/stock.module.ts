import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './stock.entity';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { Book } from '../book/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stock, Book])],
  providers: [StockService],
  controllers: [StockController],
  exports: []
})
export class StockModule { }
