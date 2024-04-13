import { createEffect } from "effector";
import { IBook, IDataState } from "../interfaces/interface";
import { api } from "./axiosInstance";
import axios from "axios";


export const handleImageUpload = async (selectedImages: any, bookId: string) => {
    try {
        const formData = new FormData();
        // console.log(bookId);
        
        selectedImages.forEach((image: any) => {
            formData.append('images', image);
        });

        formData.append("book-id", bookId);

        const response = await api.post('api/book/loadImage', formData, {
            onUploadProgress: (progressEvent: any) => {
                const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                console.log(progress);
            },
        });

        console.log(response);
        return response;
    } 
    
    catch (error) {
        console.log(error);
    }
};


export const handleCreateBook = async (userId: string, formData: IDataState) => {
    const data = { ...formData, userId: userId };

    return await createBookFx(data);
}


export const createBookFx = createEffect(async (book: IBook) => {
    const { data } = await api.post("api/book/createBook", book);
    return data;
});


export const getBookFx = createEffect(async (bookId: string) => {
    const { data } = await api.get("api/book/getBook/" + bookId);

    return data;
})


export const getUserBooksFx = createEffect(async (userId: string) => {
    const { data } = await api.get("api/book/getUserBooks/" + userId);

    return data;
});


export const getAllImages = createEffect(async () => {
    const { data } = await api.get("api/book/getAllImages");
    return data;
})
