import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDTO } from './dto/CreateBookDTO';
import * as fs from 'fs/promises';

@Injectable()
export class BookService {
  
  constructor(private readonly prismaService: PrismaService) {}


  async getBook(bookId: string) {
    try {
      return await this.prismaService.book.findFirst({
        where: {
          id: bookId,
        }
      })
    }

    catch (e) {
      console.log(e);
    }
  }


  async getBooks() {
      try {
          return await this.prismaService.book.findMany();
      }


      catch (e) {
          console.log(e);
      }
  }


  async loadImages(images: any, bookId: string) {
      const savedImages = [];
  
      for (const image of images) {
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        const imagePath = `images/${timestamp}_${image.originalname}`;
  
        savedImages.push(imagePath);
  
        await fs.writeFile(`${__dirname}/../uploads/${imagePath}`, image.buffer);
      }


      const book = await this.prismaService.book.findFirst({
        where: { 
          id: bookId,
        }
      });
  
      if (!book) {
        throw new Error('Книга не найдена');
      }
  
      const createdImages = await this.prismaService.image.createMany({
        data: savedImages.map((path) => ({
          path,
          bookId,
          filename: path.split('/').pop(),
        }))
      });
  
      return createdImages;
  }


  async getBookImages(id: string) {
      const userImages = await this.prismaService.image.findMany({
        where: {
          id: id
        }
      }) 
      return userImages;
  }


  async getBookData(data: CreateBookDTO) {
    console.log(data);

    return await this.prismaService.book.create({
        data: {
            title: data.title,
            author: data.author,
            descripton: data.description,
            genre: data.genre,
            dealType: data.dealType,
            damageLevel: data.damageLevel,
            userId: data.userId,
        }
    })
  }


  async createBook(data: CreateBookDTO) {
      return await this.prismaService.book.create({
          data: {
              title: data.title,
              author: data.author,
              descripton: data.description,
              genre: data.genre,
              dealType: data.dealType,
              damageLevel: data.damageLevel,
              userId: data.userId,
          }
      })
  }


  async getUserBooks(userId: string) {
    return await this.prismaService.book.findMany({
      where: {
        userId: userId,
      }
    })
  }
}
