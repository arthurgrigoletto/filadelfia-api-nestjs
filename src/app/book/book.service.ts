import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { File } from '../file/file.entity';
import { Repository, FindOptionsWhere } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
    @InjectRepository(File) private readonly fileRepo: Repository<File>,
  ) {}

  public async findAll(): Promise<Book[]> {
    return await this.bookRepo.find({
      relations: ['cover'],
      select: {
        id: true,
        title: true,
        author: true,
        category: true,
        publisher: true,
        pages: true,
        description: true,
        year: true,
        language: true,
        cover: {
          id: true,
          name: true,
          url: true,
        },
      },
    });
  }

  public findOne(where: FindOptionsWhere<Book>): Promise<Book> {
    return this.bookRepo.findOne({
      where,
      relations: ['cover'],
      select: {
        id: true,
        title: true,
        author: true,
        category: true,
        publisher: true,
        pages: true,
        description: true,
        year: true,
        language: true,
        cover: {
          id: true,
          name: true,
          url: true,
        },
      }
    });
  }

  public async store(bookData: CreateBookDto): Promise<Book> {
    const book = this.bookRepo.create(bookData);
    book.cover = await this.fileRepo.findOne(bookData.coverId);

    return this.bookRepo.save(book);
  }

  public async update(id: string, bookData: UpdateBookDto) {
    await this.bookRepo.update(id, bookData);

    return await this.findOne({ id });
  }

  public async remove(id: string) {
    await this.bookRepo.delete(id);
  }
}
