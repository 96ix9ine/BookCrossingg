import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDTO } from './dto/CreateBookDTO';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Req, UploadedFiles } from '@nestjs/common';


@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}


    @Post('loadImage')
    @UseInterceptors(FilesInterceptor('images'))
    async loadImage(
      @UploadedFiles() images: any,
      @Body('book-id') bookId: string
    ) {
      return this.bookService.loadImages(images, bookId)
    }
    
  
    @Get(':bookId/images')
    async getUserImages(@Param('bookId') bookId: string) {
      return this.bookService.getBookImages(bookId);
    }


    @Get("getBook")
    async GetBooks() {
        return this.bookService.getBooks();
    }


    @Post("createBook")
    async CreateBook(@Body() data: CreateBookDTO) {
        return this.bookService.createBook(data);
    }
}
