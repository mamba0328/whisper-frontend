import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { useGlobalStore } from "../../store/store";

import { Chat } from "../../types/types";

import { Sidebar } from "../../components/Sidebar/Sidebar";
import { ChatWindow } from "../../components/ChatWindow/ChatWindow";

import { getUsersChats } from "../../services/UserRequestsService/UserRequestsService";
import { CurrentUserIdContext } from "../../context/CurrentUserIdContext/CurrentUserIdContext";

export const Home = () => {
    const { chatId } = useParams();
    const { currentUserId } = useContext(CurrentUserIdContext);

    const { allChats, setAllChats } = useGlobalStore();
    const [selectedChat, setSelectedChat] = useState({} as Chat);

    const getSetChats = async () => {
        try {
            const userChats = await getUsersChats({ chat_users: currentUserId! });
            setAllChats(userChats);
        } catch (error) {
            console.log(error);
        }
    };
    const getSetSelectedChat = () => {
        if (chatId) {
            const selectedChat = allChats.find((chat) => chat._id === chatId);
            selectedChat && setSelectedChat(selectedChat);
        }
    };

    useEffect(() => {
        void getSetChats();
    }, []);

    useEffect(() => {
        void getSetSelectedChat();
    }, [chatId, allChats]);

    return (
        <div className={"flex"}>
            <Sidebar chats={allChats} setSelectedChat={setSelectedChat}/>
            <ChatWindow chatData={selectedChat} />
        </div>
    );
};

