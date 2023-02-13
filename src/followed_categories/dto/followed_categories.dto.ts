import { IsNotEmpty, IsEmail } from "class-validator";

export class FollowedCategoriesDto {  
    @IsNotEmpty()  id: string;
    @IsNotEmpty()  user_id: string;
    @IsNotEmpty()  categories_id: string;
}