import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateWishlistDto {
  @IsNotEmpty() user_id: string;
  @IsNotEmpty() announcement_id: string;
}
