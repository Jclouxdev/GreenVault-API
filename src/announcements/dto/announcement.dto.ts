import { IsNotEmpty, IsEmail, IsNumber, IsString } from "class-validator";

export class AnnouncementDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    user_id: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsString()
    categories: string;

    @IsNotEmpty()
    creation_date: string;

    @IsNotEmpty()
    status: boolean;

    @IsNotEmpty()
    paiement_date: string;
}