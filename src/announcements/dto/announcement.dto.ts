import { IsNotEmpty, IsEmail, IsNumber, IsString } from 'class-validator';

export class AnnouncementsDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  categorie: string;

  @IsNotEmpty()
  creation_date: string;

  @IsNotEmpty()
  status: boolean;

  @IsNotEmpty()
  paiement_date: string;
}
