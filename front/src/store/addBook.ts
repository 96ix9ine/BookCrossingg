import { createEvent, createStore } from "effector";
import { IBook, ResultBook } from "../interfaces/interface";
import { createBookFx, getUserBooksFx } from "../api/addBookApi";

export const $books = createStore<IBook[]>([]);

$books.on(createBookFx.doneData, (book, newBook) => [...book, newBook]);
$books.on(getUserBooksFx.doneData, (_, books) => books);



// Окончательная книга с путем к изображению. Выводится в каталоге.
export const $resultBook = createStore<ResultBook[]>([]);
export const addResultBook = createEvent();

$resultBook.on(addResultBook, (_, book) => book);

