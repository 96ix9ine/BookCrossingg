import { createEvent, createStore } from "effector";


export const $dealAddress = createStore<string>("");
export const setDealAddress = createEvent<string>();


$dealAddress.on(setDealAddress, (_, address) => address);