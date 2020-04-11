import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stock } from 'app/models/stock';
import { StockService } from 'app/services/stock.service';
import { StockController } from 'app/controllers/stock.controller';
import { Book } from 'app/models/book';

@Module({
  imports: [SequelizeModule.forFeature([Stock, Book])],
  providers: [StockService],
  controllers: [StockController],
  exports: []
})
export class StockModule { }
