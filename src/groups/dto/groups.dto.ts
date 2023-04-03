import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class GroupsDto {
  @IsNotEmpty() id: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
