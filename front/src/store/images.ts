import { createEvent, createStore } from "effector";
import { getAllImages } from "../api/addBookApi";



export const $imagesStore = createStore<any[]>([]);
export const setImages = createEvent();

$imagesStore.on(getAllImages.doneData, (_, images) => images);