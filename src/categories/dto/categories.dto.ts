import { IsNotEmpty, IsEmail } from "class-validator";

export class WishlistDto {  
    @IsNotEmpty()  id: string;
    @IsNotEmpty()  name: string;
    @IsNotEmpty()  group_id: string;
}