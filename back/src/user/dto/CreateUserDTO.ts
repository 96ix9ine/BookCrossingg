import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    userId: string
}