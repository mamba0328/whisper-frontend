import { post, get, del, put } from "../AxiosMethodsService/AxiosMethodsService";

import {
    CHATS,
    SIGN_IN,
    SIGN_OUT,
    SIGN_UP,
    CHAT_MESSAGES,
    MESSAGE_SEEN_BY,
    MESSAGES_IMGS,
    CLOUDINARY_STORAGE,
    CLOUDINARY_SIGNATURE
} from "./consts/UserRequestRoutes";

import {
    SignInPayload,
    UserPayload,
    User,
    Chat,
    AxiosQuery,
    Message,
    MessageSeenBy,
    MessageSeenByPayload, CloudinaryResponse, SignatureResponse
} from "../../types/types";
import axios from "axios";


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

export const getMessageImg = async (id:string, params?:AxiosQuery):Promise<string> => {
    const res = await get(`${MESSAGES_IMGS}/${id}`, { params });

    const data:string = res.data;

    return data;
};

export const viewMessage = async (messageViewByPayload: MessageSeenByPayload):Promise<MessageSeenBy> => {
    const res = await post(`${MESSAGE_SEEN_BY}`, messageViewByPayload);

    const data:MessageSeenBy = res.data;

    return data;
};

export const getSignature = async (params?:AxiosQuery):Promise<SignatureResponse> => {
    const res = await get(`${CLOUDINARY_SIGNATURE}`, { params });

    return res.data as SignatureResponse;
};

export const saveImg = async (formData:FormData):Promise<CloudinaryResponse> => {
    const res = await axios.post(CLOUDINARY_STORAGE, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });

    return res.data as CloudinaryResponse;
};

