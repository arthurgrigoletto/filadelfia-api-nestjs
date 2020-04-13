import { Injectable } from '@nestjs/common';
import { Stock } from './stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../book/book.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock) private readonly stockModel: Repository<Stock>,
  ) { }

  public async findAll(): Promise<Stock[]> {
    return this.stockModel.find({
      relations: ['book'],
      select: {
        id: true,
        amount: true,
        book: {
          id: true,
          title: true,
        }
      }
    });
  }

  public async store(book: Book): Promise<Stock> {
    const stock = this.stockModel.create({ book });
    return this.stockModel.save(stock);
  }

  // public async destroy(bookId: number) {
  //   const stock = await this.stockModel.findOne({ where: { bookId }});

  //   await stock.destroy();
  // }
}
