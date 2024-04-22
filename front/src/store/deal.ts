import { createStore } from "effector";
import { IDeal } from "../interfaces/interface";
import { getDeals } from "../api/dealApi";


export const $dealStore = createStore<IDeal[]>([]);
$dealStore.on(getDeals.doneData, (_, deal) => deal);
