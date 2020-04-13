import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { configService } from './services/config.service';
import { AppController } from './app.controller';
import { FileModule } from './file/file.module';
import { StockModule } from './stock/stock.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    BookModule,
    FileModule,
    StockModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
