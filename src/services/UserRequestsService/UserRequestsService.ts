import { post, get } from "../AxiosMethodsService/AxiosMethodsService";

import { CHATS, SIGN_IN, SIGN_OUT, SIGN_UP } from "./consts/UserRequestRoutes";

import { SignInPayload, UserPayload, User, Chat } from "../../types/types";


export const signIn = async (payload:SignInPayload):Promise<string | null> => {
    const res = await post(SIGN_IN, payload);

    const data:string | null = res.data;
    return data;
};

export const signUp = async (payload:UserPayload):Promise<User | undefined> => {
    const res = await post(SIGN_UP, payload);

    const data:User = res.data;
    return data;

};

export const signOut = async ():Promise<boolean | undefined> => {
    const res = await post(SIGN_OUT);

    const data:boolean = res.data;
    return data;
};


export const getUsersChats = async ():Promise<Array<Chat>> => {
    const res = await get(CHATS);

    const data:Array<Chat> = res.data;

    return data;
};
