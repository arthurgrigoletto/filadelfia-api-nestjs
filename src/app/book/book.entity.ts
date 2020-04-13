import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { File } from '../file/file.entity';
import { BaseEntity } from '../models/base.entity';

@Entity({ name: 'books' })
export class Book extends BaseEntity {

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  author: string;

  @Column({ type: 'varchar' })
  category: string;

  @Column({ type: 'varchar' })
  publisher: string;

  @Column({ type: 'integer' })
  pages: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'integer' })
  year: number;

  @Column({ type: 'varchar' })
  language: string;

  @OneToOne(() => File, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'cover_id' })
  cover: File;
}
