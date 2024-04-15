import { createEffect } from "effector";
import { api } from "./axiosInstance";


export const handleCreateDeal = async (userId: string, bookId: string) => {
    try {
        const data = { userId: userId, bookId: bookId };
        return await createDealFx(data);
    }

    catch (e) {
        throw new Error("Произошла ошибка в handleCreateDeal")
    }
    
}


export const createDealFx = createEffect(async (dealData: any) => {
    try {
        const { data } = await api.post("api/deal/createDeal", dealData)
        return data;
    }

    catch (e) {
        throw new Error("Произошла ошибка в createDealFx")
    }
    
});
