import { UserInfo } from "@vkontakte/vk-bridge";
import { createEvent, createStore } from "effector";


export const $user = createStore<UserInfo | null>(null);
export const setUser = createEvent<UserInfo>();

$user.on(setUser, (_, user) => user);



