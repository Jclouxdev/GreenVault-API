import { IsNotEmpty, IsEmail } from "class-validator";

export class CreateFollowedCategoriesDto {  
    @IsNotEmpty()  user_id: string;
    @IsNotEmpty()  categories_id: string;
}