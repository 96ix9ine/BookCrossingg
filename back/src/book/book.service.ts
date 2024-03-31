import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDTO } from './dto/CreateBookDTO';

@Injectable()
export class BookService {
    constructor(private readonly prismaService: PrismaService) {}


    async getBooks() {
        try {
            return await this.prismaService.book.findMany();
        }


        catch (e) {
            console.log(e);
        }
    }


    async createBook(data: CreateBookDTO) {
        return await this.prismaService.book.create({data: {
            title: data.title,
            author: data.author,
            descripton: data.description,
            genre: data.genre,
            dealType: data.dealType,
            damageLevel: data.damageLevel,
            imagePath: data.imagePath
        }})
        
        
    }
}
