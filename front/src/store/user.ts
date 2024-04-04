import { UserInfo } from "@vkontakte/vk-bridge";
import { createEvent, createStore } from "effector";
import { createUserFx } from "../api/addUser";


export const $user = createStore<UserInfo | null>(null);
export const setUser = createEvent<UserInfo>();

$user.on(setUser, (_, user) => user);

export const $userServerStore = createStore<any>(null);

$userServerStore.on(createUserFx.doneData, (_, user) => user);
