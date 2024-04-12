import { createEvent, createStore } from "effector";
import { IBook } from "../interfaces/interface";
import { createBookFx, getUserBooksFx } from "../api/addBookApi";

export const $books = createStore<IBook[]>([]);

$books.on(createBookFx.doneData, (book, newBook) => [...book, newBook]);
$books.on(getUserBooksFx.doneData, (_, books) => books);

export const $resultBook = createStore<IBook[]>([]);
export const addResultBook = createEvent();

$resultBook.on(addResultBook, (_, book) => book);