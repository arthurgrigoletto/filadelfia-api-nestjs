import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseInterceptors,
  CacheInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { StockService } from '../stock/stock.service';
import { Book } from './book.entity';

@Controller('books')
export class BookController {
  constructor(public bookService: BookService, public stockService: StockService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  public async index() {
    return await this.bookService.findAll();
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  public async show(
    @Param('id') id: string,
  ): Promise<Book> {
    try {
      const book = await this.bookService.findOne({ id });

      return book
    } catch (error) {
      throw new HttpException({
        error: `Book with ${id} not found`
      }, HttpStatus.NOT_FOUND);
    }

  }

  @Post()
  public async store(
    @Body() createBookDto: CreateBookDto,
  ) {
    const hasBook = await this.bookService.findOne({ title: createBookDto.title });

    if (hasBook) {
      throw new HttpException({
        error: `Already have a book with this title, increase the stock instead`
      }, HttpStatus.BAD_REQUEST);
    }

    const book = await this.bookService.store(createBookDto);

    /**
     * Create a stock to new book
     */
    await this.stockService.store(book);

    return book;
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    const book = await this.bookService.update(id, updateBookDto);

    return book;
  }

  @Delete(':id')
  public async destroy(
    @Param('id') id: string,
  ) {
    try {
      await this.bookService.remove(id);

      return { success: true };
    } catch (error) {
      throw new HttpException({
        error: `Book with id ${id} not found`
      }, HttpStatus.NOT_FOUND);
    }
  }
}
