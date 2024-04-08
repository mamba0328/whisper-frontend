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
    const [selectedChat, setSelectedChat] = useState({} as Chat);

    const getSetChats = async () => {
        try {
            const userChats = await getUsersChats({ chat_users: currentUserId! });
            setChats(userChats);
        } catch (error) {
            console.log(error);
        }
    };

    const getSetSelectedChat = () => {
        if (chatId) {
            const selectedChat = chats.find((chat) => chat._id === chatId);
            selectedChat && setSelectedChat(selectedChat);
        }
    };

    const updateChatLastMessage = (newMessage:Message) => {
        const indexOfChatWithUpdatedMessage = chats.findIndex((chat) => chatId ? chatId === chat._id : selectedChat._id === chat._id);
        const chatsClone = [...chats];

        if (!chatsClone[indexOfChatWithUpdatedMessage]) {
            return;
        }

        chatsClone[indexOfChatWithUpdatedMessage]!.chat_messages = [newMessage];
        setChats(chatsClone);
    };

    useEffect(() => {
        void getSetChats();
    }, []);

    useEffect(() => {
        void getSetSelectedChat();
    }, [chatId, chats]);

    return (
        <div className={"flex"}>
            <Sidebar chats={chats} setSelectedChat={setSelectedChat}/>
            <ChatWindow chatId={chatId} selectedChat={selectedChat} updateChatLastMessage={updateChatLastMessage}/>
        </div>
    );
};

