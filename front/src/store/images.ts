import { createEvent, createStore } from "effector";



export const $imagesStore = createStore<any[]>([]);
export const setImages = createEvent();

$imagesStore.on(setImages, (_, images) => images);