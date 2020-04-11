import { Table, Column, Model, DataType, BelongsTo, HasOne, ForeignKey } from 'sequelize-typescript';
import { Book } from './book';

@Table({ tableName: 'stock' })
export class Stock extends Model<Stock> {
  @Column({ type: DataType.INTEGER, defaultValue: 1 })
  amount: number;

  @ForeignKey(() => Book)
  @Column({ type: DataType.INTEGER, field: 'book_id' })
  bookId: number;

  @HasOne(() => Book, { foreignKey: 'book_id', onDelete: 'CASCADE' })
  book: Book;
}
