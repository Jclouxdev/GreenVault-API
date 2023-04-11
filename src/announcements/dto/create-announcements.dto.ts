import { IsNotEmpty, IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateAnnouncementsDto {

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  categorie: string;
}
