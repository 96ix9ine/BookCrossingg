import { createEvent, createStore } from "effector";
import { IBook } from "../interfaces/IBook";
import { createBookFx } from "../api/addBookApi";

export const $books = createStore<IBook[]>([]);


$books.on(createBookFx.doneData, (book, newBook) => [...book, newBook]);