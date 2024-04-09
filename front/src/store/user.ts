import { createEvent, createStore } from "effector";
import { createUserFx } from "../api/addUserApi";
import { IServerUser } from "../interfaces/interface";
import { UserInitialState } from "../constatns/UserStateConstant";
import { UserInfo } from "@vkontakte/vk-bridge";


export const $user = createStore<UserInfo | null>(null);
export const setUser = createEvent<UserInfo>();

$user.on(setUser, (_, user) => user);

export const $userServerStore = createStore<any>(null);

$userServerStore.on(createUserFx.doneData, (_, user) => user);
