import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Chat } from "../../types/types";

import { Sidebar } from "../../components/Sidebar/Sidebar";
import { ChatWindow } from "../../components/ChatWindow/ChatWindow";

import { getUsersChats } from "../../services/UserRequestsService/UserRequestsService";

export const Home = () => {
    const { chatId } = useParams();
    const [chats, setChats] = useState([] as Array<Chat>);


    const getSetChats = async () => {
        try {
            const userChats = await getUsersChats();
            setChats(userChats);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        void getSetChats();
    });

    return (
        <div className={"flex"}>
            <Sidebar/>
            <ChatWindow chatId={chatId}/>
        </div>
    );
};

