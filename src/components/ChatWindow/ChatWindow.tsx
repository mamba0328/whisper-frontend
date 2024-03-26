import React, { useState, useEffect, useContext } from "react";

import { TopNav } from "../TopNav/TopNav";
import { ChatMessages } from "../ChatMessages/ChatMessages";
import { NewMessageForm } from "../NewMessageForm/NewMessageForm";

import { getUsersChatMessages } from "../../services/UserRequestsService/UserRequestsService";


import { Message } from "../../types/types";
import { CurrentUserIdContext } from "../../context/CurrentUserIdContext/CurrentUserIdContext";

type Props = {
    chatId: string | undefined,
    firstMessage: Message,
}

export function ChatWindow ({ chatId, firstMessage } : Props) {
    const { currentUserId } = useContext(CurrentUserIdContext);
    const [messages, setMessages] = useState([firstMessage]);

    useEffect(() => {
        void getSetChatMessages();
    }, [chatId]);

    const getSetChatMessages = async () => {
        if (!chatId) {
            return;
        }
        try {
            const chatMessages = await getUsersChatMessages({ chat_id: chatId });
            setMessages(chatMessages);
        } catch (error) {
            console.log(error);
        }
    };

    if (!chatId) {
        return (
            <section className={"hidden sm:grid place-content-center bg-dark-message-background-color border border-b-dark-message-background-color w-full "}>
                <p className={"p-[0.5rem] px-[1rem] rounded-3xl bg-input-search-background-color text-secondary-text-color"}>
                      "Select open chat or contact to start messaging"
                </p>
            </section>
        );
    }

    return (
        <section className={"hidden sm:flex flex-col items-center justify-start place-content-center bg-dark-message-background-color border border-b-dark-message-background-color w-full overflow-hidden"}>
            <TopNav/>
            <ChatMessages currentUserId={currentUserId} messages={messages}/>
            <NewMessageForm chatId={chatId} currentUserId={currentUserId}/>
        </section>
    );
}

