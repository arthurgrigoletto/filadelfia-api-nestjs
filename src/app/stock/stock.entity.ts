import { Entity, Column, OneToOne, JoinColumn} from 'typeorm';
import { BaseEntity } from '../models/base.entity';
import { Book } from '../book/book.entity';

@Entity({ name: 'stock' })
export class Stock extends BaseEntity {
  @Column({ type: 'integer', default: 1 })
  amount: number;

  @OneToOne(() => Book, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book: Book;
}
