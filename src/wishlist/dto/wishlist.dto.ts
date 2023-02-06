import { IsNotEmpty, IsEmail } from "class-validator";

export class WishlistDto {  
    @IsNotEmpty()  id: string;
    @IsNotEmpty()  user_id: string;
    @IsNotEmpty()  announcement_id: string;
}