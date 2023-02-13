import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class CreateGroupsDto {  

    @IsNotEmpty()
    @IsString()
      name: string;
}