import React, { useState, useEffect, useContext } from "react";

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

    const renderMessages = () => {
        if (!chatId) {
            return <p className={"p-[0.5rem] px-[1rem] rounded-3xl bg-input-search-background-color text-secondary-text-color"}>
                "Select open chat or contact to start messaging"
            </p>;
        }

        return <ul className={"flex flex-col-reverse min-h-[85vh] w-[650px] border border-surface-color p-[5px]"}>
            {messages.map((message, index) => {
                const prevMessage = messages[index - 1];
                const nextMessage = messages[index + 1];
                const messageStyles = getMessageStyles(message, prevMessage, nextMessage);

                return <li key={message._id || index} className={`text-primary-text-color rounded-xl w-fit px-[8px] py-[2px] 
                relative ${messageStyles}`}>
                    {message.body}
                </li>;
            })}
        </ul>;
    };

    const getMessageStyles = (message:Message, prevMessage:Message|undefined, nextMessage:Message|undefined) => {
        const messageBelongsToCurrentUser = message.user_id === currentUserId;
        const messageOrientationStyle = messageBelongsToCurrentUser ? "self-end" : "self-start";
        const messageBg = messageBelongsToCurrentUser ? "bg-message-out-background-color" : "bg-surface-color";

        const pseudoElementCommonStyles = "after:content-[''] after:inline-block after:absolute after:bottom-0 ";
        const pseudoElementUserStyles = "after:border-l-[6px] after:border-b-[6px] after:border-t-[6px] after:border-r-[6px] after:border-r-transparent after:border-t-transparent after:border-message-out-background-color after:right-[-5px]";
        const pseudoElementContactStyles = "after:border-r-[6px] after:border-b-[6px] after:border-t-[6px] after:border-l-[6px] after:border-l-transparent after:border-t-transparent after:border-surface-color after:left-[-5px]";
        const pseudoElementStyles = `${pseudoElementCommonStyles} ${messageBelongsToCurrentUser ? pseudoElementUserStyles : pseudoElementContactStyles}`;

        const messageIsContinuingPrevious = checkMessageWillBeContinued(prevMessage, message);
        // eslint-disable-next-line
        const messageWillBeContinuedStyles = messageIsContinuingPrevious ? (messageBelongsToCurrentUser ? "rounded-br-sm" : "rounded-bl-sm") + ' mb-[3px]' : (messageBelongsToCurrentUser ? "rounded-br-none" : "rounded-bl-none") + ` ${pseudoElementStyles} mb-[5px]`;

        const messageWillBeContinued = checkMessageWillBeContinued(message, nextMessage);
        const messageIsContinuingPreviousStyles = messageWillBeContinued ? messageBelongsToCurrentUser ? "rounded-tr-sm" : "rounded-tl-sm" : "";

        return `${messageOrientationStyle} ${messageBg} ${messageWillBeContinuedStyles} ${messageIsContinuingPreviousStyles}`;
    };
    const checkMessageWillBeContinued = (message:Message|undefined, nextMessage:Message|undefined):boolean => {

        if (!nextMessage || !message) {
            return false;
        }

        const messagesHasSomeAuthor = message.user_id === nextMessage.user_id;
        const messagesTimeIntervalInMs = new Date(nextMessage.created_at!).getMilliseconds() - new Date(message.created_at!).getMilliseconds();
        const messagesHasIntervalLessThanMinute = messagesTimeIntervalInMs < 1000 * 60;

        return messagesHasSomeAuthor && messagesHasIntervalLessThanMinute;
    };


    return (
        <section className={"hidden sm:grid place-content-center bg-dark-message-background-color border border-b-dark-message-background-color w-full "}>
            {renderMessages()}
        </section>
    );
}

