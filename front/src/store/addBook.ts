import { createEffect, createEvent, createStore } from "effector";
import { IBook } from "../interfaces/IBook";

export const $books = createStore<IBook[]>([]);

export const clearDataFx = createEffect();

export const addBook = createEvent();

$books.on(addBook, (_, book) => book);