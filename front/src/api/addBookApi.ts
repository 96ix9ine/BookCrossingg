import { createEffect } from "effector";
import { IBook } from "../interfaces/IBook";
import { api } from "./axiosInstance";

export const createBookFx = createEffect(async (book: IBook) => {
    const { data } = await api.post("book/createBook", book);

    return data;
});


export const getBookFx = createEffect(async (bookId: string) => {
    const { data } = await api.get("book/getBook/" + bookId);

    return data;
})


export const getBooksFx = createEffect(async () => {
    const { data } = await api.get("book/getBook/");

    return data;
})