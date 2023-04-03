import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateCommentsDto {
  @IsNotEmpty() message: string;
}
