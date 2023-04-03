import { IsNotEmpty, IsEmail } from 'class-validator';

export class CommentsDto {
  @IsNotEmpty() id: string;
  @IsNotEmpty() user_id: string;
  @IsNotEmpty() announcement_id: string;
  @IsNotEmpty() creation_date: string;
  @IsNotEmpty() message: string;
}
