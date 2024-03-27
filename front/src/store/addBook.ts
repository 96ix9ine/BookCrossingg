import { createEvent, createStore } from "effector";
import { IBook } from "../interfaces/IBook";

export const $books = createStore<IBook[]>([]);

export const addBook = createEvent();

$books.on(addBook, (book) => book)