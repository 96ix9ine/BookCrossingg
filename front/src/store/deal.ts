import { createStore } from "effector";
import { IDeal } from "../interfaces/interface";
import { createDealFx, getDeals } from "../api/dealApi";


export const $dealStore = createStore<IDeal[]>([]);
$dealStore.on(getDeals.doneData, (_, deal) => deal);
