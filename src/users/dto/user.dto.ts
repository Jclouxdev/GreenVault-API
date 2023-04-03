import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserDto {
  @IsNotEmpty() id: string;
  @IsNotEmpty() username: string;
  @IsNotEmpty() @IsEmail() email: string;
  @IsNotEmpty() password: string;
  @IsNotEmpty() Admin: boolean;
  @IsNotEmpty() wallet: number;
  @IsNotEmpty() creation_date: Date;
}
