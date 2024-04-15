import { createStore } from "effector";
import { IDeal } from "../interfaces/interface";
import { createDealFx } from "../api/dealApi";


export const $dealStore = createStore<IDeal[]>([]);
$dealStore.on(createDealFx.doneData, (_, deal) => deal);
