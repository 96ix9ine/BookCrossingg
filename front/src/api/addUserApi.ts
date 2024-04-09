import { createEffect } from "effector";
import { api } from "./axiosInstance";
import { $userServerStore } from "../store/user";
import { useUnit } from "effector-react";


export const getUserIdFx = createEffect(async (vkId: number) => {
    const idString = vkId.toString();
    const { data } = await api.get("api/user/getUser/" + idString);
    return data;
})


// Добавление ID пользователя в базу данных.
export const createUserFx = createEffect(async (vkId: number) => {
    const vkIdString = vkId.toString();
    // console.log(vkIdString)

    const { data } = await api.post("api/user/checkUser", { vkId: vkIdString });
    console.log(data);
    return data;
});
