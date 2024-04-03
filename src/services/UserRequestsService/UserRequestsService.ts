import { post, get, del, put } from "../AxiosMethodsService/AxiosMethodsService";

import { CHATS, SIGN_IN, SIGN_OUT, SIGN_UP, CHAT_MESSAGES } from "./consts/UserRequestRoutes";

import { SignInPayload, UserPayload, User, Chat, AxiosQuery, Message, MessagePayload } from "../../types/types";
import { AxiosRequestConfig } from "axios";


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


export const getUsersChats = async (params:AxiosQuery):Promise<Array<Chat>> => {
    const res = await get(CHATS, { params });

    const data:Array<Chat> = res.data;

    return data;
};

export const getUsersSingleChat = async (id:string, params:AxiosQuery):Promise<Chat> => {
    const res = await get(`${CHATS}/${id}`, { params });

    const data:Chat = res.data;

    return data;
};

export const getUsersChatMessages = async (params:AxiosQuery):Promise<Array<Message>> => {
    const res = await get(CHAT_MESSAGES, { params });

    const data:Array<Message> = res.data;

    return data;
};
export const createNewMessage = async (messagePayload:MessagePayload, params?:AxiosQuery):Promise<Message> => {
    const res = await post(CHAT_MESSAGES, messagePayload, { params });

    const data:Message = res.data;

    return data;
};

export const updateMessage = async (messageId:string, messageBody:string):Promise<Message> => {
    const res = await put(`${CHAT_MESSAGES}/${messageId}`, { body: messageBody });

    const data:Message = res.data;

    return data;
};
export const deleteMessage = async (messageId:string):Promise<boolean> => {
    const res = await del(`${CHAT_MESSAGES}/${messageId}`);

    const data:boolean = res.data;

    return data;
};
