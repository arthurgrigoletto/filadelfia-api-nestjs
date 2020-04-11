import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'
import { BookModule } from './modules/book.module';
import { configService } from './services/config.service';
import { AppController } from './app.controller';
import { FileModule } from './modules/file.module';
import { StockModule } from './modules/stock.module';

import { Book } from './models/book';
import { File } from './models/file';
import { Stock } from './models/stock';

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...configService.getSequelizeConfig(),
      models: [Book, File, Stock]
    }),
    BookModule,
    FileModule,
    StockModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
