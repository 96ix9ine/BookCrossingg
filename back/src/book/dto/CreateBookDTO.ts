import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class CreateBookDTO {
    @IsNotEmpty()
    @IsString()
    title: string


    @IsNotEmpty()
    @IsString()
    author: string  


    @IsNotEmpty()
    @IsString()
    @MaxLength(3000)
    @MinLength(1)
    description: string


    @IsNotEmpty()
    @IsString()
    genre: string


    @IsNotEmpty()
    @IsString()
    dealType: string


    @IsNotEmpty()
    @IsString()
    damageLevel: string


    @IsNotEmpty()
    @IsString()
    imagePath: string
}