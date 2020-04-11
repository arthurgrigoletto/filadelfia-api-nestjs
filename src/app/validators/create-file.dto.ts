import { IsDefined, IsString, IsNumber } from 'class-validator';

export class CreateFileDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  key: string;

  @IsDefined()
  @IsNumber()
  size: number;

  @IsDefined()
  @IsString()
  url: string;
}
