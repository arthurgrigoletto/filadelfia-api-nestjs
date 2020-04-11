// import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Table, Column, Model, DataType, BelongsTo } from 'sequelize-typescript';
import { File } from './file';

@Table({ tableName: 'books' })
export class Book extends Model<Book> {

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.STRING })
  author: string;

  @Column({ type: DataType.STRING })
  category: string;

  @Column({ type: DataType.STRING })
  publisher: string;

  @Column({ type: DataType.INTEGER })
  pages: number;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({ type: DataType.INTEGER })
  year: number;

  @Column({ type: DataType.STRING })
  language: string;

  @BelongsTo(() => File, { foreignKey: 'cover_id', onDelete: 'SET NULL' })
  cover: File;
}
