import { createStore } from "effector";
import { IBook } from "../interfaces/IBook";
import { createBookFx, getBooksFx } from "../api/addBookApi";

export const $books = createStore<IBook[]>([]);


$books.on(createBookFx.doneData, (book, newBook) => [...book, newBook]);
$books.on(getBooksFx.doneData, (_, books) => books);