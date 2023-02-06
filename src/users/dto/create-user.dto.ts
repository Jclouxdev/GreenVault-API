import { IsNotEmpty, IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserDto {  
    @IsNotEmpty()  username: string;
    @IsNotEmpty()  password: string;
    @IsNotEmpty()  @IsEmail()  email: string;
}
