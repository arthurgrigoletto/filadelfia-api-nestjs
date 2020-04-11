import { Injectable } from '@nestjs/common';
import { Stock } from '../models/stock';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from 'app/models/book';

@Injectable()
export class StockService {
  constructor(
    @InjectModel(Stock) private readonly stockModel: typeof Stock,
    @InjectModel(Book) private readonly bookModel: typeof Book
  ) { }

  public async findAll(): Promise<Stock[]> {
    return this.stockModel.findAll({
      include: [
        {
          model: Book,
          as: 'book',
          attributes: ['id', 'title']
        }
      ]
    });
  }

  public async store(bookId: number): Promise<Stock> {
    return await this.stockModel.create({ bookId });
  }

  public async destroy(bookId: number) {
    const stock = await this.stockModel.findOne({ where: { bookId }});

    await stock.destroy();
  }
}
