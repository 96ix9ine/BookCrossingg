import { Controller, Get, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDTO } from './dto/CreateBookDTO';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}


    @Get("getBook")
    async GetBooks() {
        return this.bookService.getBooks();
    }


    @Post("createBook")
    async CreateBook(data: CreateBookDTO) {
        return this.bookService.createBook(data);
    }
}
