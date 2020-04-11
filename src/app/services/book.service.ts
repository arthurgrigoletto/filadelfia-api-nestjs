import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from '../models/book';
import { WhereOptions } from 'sequelize/types';
import { CreateBookDto } from 'app/validators/create-book.dto';
import { File } from 'app/models/file';
import { UpdateBookDto } from 'app/validators/update-book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book) private readonly bookModel: typeof Book) {}

  public findAll(): Promise<Book[]> {
    return this.bookModel.findAll({
      attributes: [
        'id',
        'title',
        'author',
        'category',
        'publisher',
        'pages',
        'description',
        'year',
        'language'
      ],
      include: [
        {
          model: File,
          as: 'cover',
          attributes: ['id', 'name', 'url'],
        },
      ],
    });
  }

  public findOne(conditions: WhereOptions): Promise<Book> {
    return this.bookModel.findOne({
      where: conditions,
      attributes: [
        'id',
        'title',
        'author',
        'category',
        'publisher',
        'pages',
        'description',
        'year',
        'language'
      ],
      include: [
        {
          model: File,
          as: 'cover',
          attributes: ['id', 'name', 'url']
        }
      ]
    });
  }

  public async store(bookData: CreateBookDto): Promise<Book> {
    return this.bookModel.create(bookData);
  }

  public async update(id: string, bookData: UpdateBookDto): Promise<Book> {
    const book = await this.findOne({ id });

    await book.update(bookData);

    return book;
  }

  public async remove(id: string) {
    const book = await this.findOne({ id });

    await book.destroy()
  }
}
