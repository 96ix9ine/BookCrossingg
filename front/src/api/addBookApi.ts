import { createEffect } from "effector";
import { IBook } from "../interfaces/IBook";

export const createBookFx = createEffect(async (book: IBook) => {
    return await book;
});
