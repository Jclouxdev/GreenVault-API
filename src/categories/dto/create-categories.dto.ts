import { IsNotEmpty, IsEmail, IsString, isUUID } from 'class-validator';
import { Unique } from 'typeorm';

export class CreateCategoriesDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  group_id: string;
}
