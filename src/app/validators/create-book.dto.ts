import { IsDefined, IsString, MinLength, IsNumber } from 'class-validator';

export class CreateBookDto {
  @IsDefined({ always: true })
  @IsString({ always: true })
  @MinLength(3, { always: true })
  title: string;

  @IsDefined({ always: true })
  @IsString({ always: true })
  @MinLength(3, { always: true })
  author: string;

  @IsDefined({ always: true })
  @IsString({ always: true })
  @MinLength(3, { always: true })
  category: string;

  @IsDefined({ always: true })
  @IsString({ always: true })
  @MinLength(3, { always: true })
  publisher: string;

  @IsDefined({ always: true })
  @IsNumber()
  pages: number;

  @IsDefined({ always: true })
  @IsString({ always: true })
  @MinLength(3, { always: true })
  description: string;

  @IsDefined({ always: true })
  @IsNumber()
  year: number;

  language: string;

  coverId: string;
}
