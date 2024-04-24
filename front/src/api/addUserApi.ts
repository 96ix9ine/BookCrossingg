import { createEffect } from "effector";
import { api } from "./axiosInstance";


export const getUserIdFx = createEffect(async (vkId: number) => {
    const idString = vkId.toString();
    const { data } = await api.get("api/user/getUser/" + idString);
    return data;
})


export const getVkUserId = async (id: string) => {
    const { data } = await api.get("api/user/getUserByVkId/" + id);
    return data;
}


// Добавление ID пользователя в базу данных.
export const createUserFx = createEffect(async (vkId: number) => {
    const vkIdString = vkId.toString();

    const { data } = await api.post("api/user/checkUser", { vkId: vkIdString });
    return data;
});

