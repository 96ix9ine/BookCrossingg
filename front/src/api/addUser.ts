import { createEffect } from "effector";
import { api } from "./axiosInstance";


// Добавление ID пользователя в базу данных.
export const createUserFx = createEffect(async (id: number) => {
    const idString = id.toString();
    const { data } = await api.post("/api/user/checkUser", { vkId: idString });
    return data;
});
