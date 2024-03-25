import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { Chat, Message } from "../../types/types";

import { Sidebar } from "../../components/Sidebar/Sidebar";
import { ChatWindow } from "../../components/ChatWindow/ChatWindow";

import { getUsersChats } from "../../services/UserRequestsService/UserRequestsService";
import { CurrentUserIdContext } from "../../context/CurrentUserIdContext/CurrentUserIdContext";

export const Home = () => {
    const { chatId } = useParams();
    const { currentUserId } = useContext(CurrentUserIdContext);

    const [chats, setChats] = useState([] as Array<Chat>);
    const [selectedChatFirstMessage, setSelectedChatFirstMessage] = useState({} as Message);

    const getSetChats = async () => {
        try {
            const userChats = await getUsersChats({ chat_users: currentUserId! });
            setChats(userChats);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        void getSetChats();
    }, []);

    return (
        <div className={"flex"}>
            <Sidebar chats={chats} setSelectedChatFirstMessage={setSelectedChatFirstMessage}/>
            <ChatWindow chatId={chatId} firstMessage={selectedChatFirstMessage}/>
        </div>
    );
};

