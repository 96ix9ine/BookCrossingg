import { createStore } from "effector";
import { IBook } from "../interfaces/interface";
import { createBookFx, getUserBooksFx } from "../api/addBookApi";

export const $books = createStore<IBook[]>([]);


$books.on(createBookFx.doneData, (book, newBook) => [...book, newBook]);
$books.on(getUserBooksFx.doneData, (_, books) => books);