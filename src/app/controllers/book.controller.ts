import {
  Controller,
  Get,
  Param,
  Response,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Response as IResponse } from 'express';
import { BookService } from '../services/book.service';
import { CreateBookDto } from 'app/validators/create-book.dto';
import { UpdateBookDto } from 'app/validators/update-book.dto';
import { StockService } from 'app/services/stock.service';

@Controller('books')
export class BookController {
  constructor(public bookService: BookService, public stockService: StockService) {}

  @Get()
  public async index() {
    return await this.bookService.findAll();
  }

  @Get(':id')
  public async show(
    @Param('id') id: string,
    @Response() res: IResponse,
  ): Promise<IResponse> {
    try {
      const book = await this.bookService.findOne({ id });

      return res.json(book);
    } catch (error) {
      return res.status(404).json({ error: `Book with id ${id} not found` });
    }
  }

  @Post()
  public async store(
    @Body() createBookDto: CreateBookDto,
    @Response() res: IResponse,
  ) {
    const hasBook = await this.bookService.findOne({ title: createBookDto.title });

    if (hasBook) {
      return res.status(400).json({
        error: `Already have a book with this title, increase the stock instead`,
      });
    }

    const book = await this.bookService.store(createBookDto);

    await this.stockService.store(book.id);

    return res.json(book);
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
    @Response() res: IResponse,
  ): Promise<IResponse> {
    try {
      const result = await this.bookService.remove(id);

      // await this.stockService.destroy(parseInt(id));

      return res.json(result);
    } catch (error) {
      return res.status(404).json({ error: `Book with id ${id} not found` });
    }
  }
}
