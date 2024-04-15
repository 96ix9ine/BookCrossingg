import { IsNotEmpty, IsString } from "class-validator";


export class CreateDealDTO {
    @IsNotEmpty()
    @IsString()
    userId: string


    @IsNotEmpty()
    @IsString()
    bookId: string


    @IsNotEmpty()
    @IsString()
    address: string
}