import React from "react";

import { getFormatedMessageTime } from "../../utils/helpers";
import { Message } from "../../types/types";

type Props = {
    messages: Array<Message>,
    currentUserId: string | null,
}
export const ChatMessages = ({ messages, currentUserId }:Props) => {
    const renderMessages = () => {

        return <ul className={"flex flex-grow flex-col-reverse max-h-[85vh] w-full max-w-[650px]  p-[5px]"}>
            {messages.map((message, index) => {
                const prevMessage = messages[index - 1];
                const nextMessage = messages[index + 1];
                const messageStyles = getMessageStyles(message, prevMessage, nextMessage);

                const formatedTime = getFormatedMessageTime(message.created_at!);

                return <li key={message._id || index} className={`text-primary-text-color rounded-xl w-fit px-[8px] py-[2px] 
                relative ${messageStyles} pr-[40px]`}>
                    {message.body}
                    <span className={"absolute right-[6px] bottom-[3px] text-xs text-primary-text-color font-light opacity-80 "}>{formatedTime}</span>
                </li>;
            })}
        </ul>;
    };

    const getMessageStyles = (message:Message, prevMessage:Message|undefined, nextMessage:Message|undefined) => {
        const messageBelongsToCurrentUser = message.user_id === currentUserId;
        const messageOrientationStyle = messageBelongsToCurrentUser ? "self-end" : "self-start";
        const messageBg = messageBelongsToCurrentUser ? "bg-message-out-background-color" : "bg-surface-color";

        const pseudoElementStyles = messageBelongsToCurrentUser ? "tail" : "tail-inverse";

        const messageIsContinuingPrevious = checkMessageWillBeContinued(prevMessage, message);
        // eslint-disable-next-line
        const tailStyles = messageIsContinuingPrevious ? (messageBelongsToCurrentUser ? "rounded-br-sm" : "rounded-bl-sm") + ' mb-[3px]' : (messageBelongsToCurrentUser ? "rounded-br-none" : "rounded-bl-none") + ` ${pseudoElementStyles} mb-[5px]`;

        const messageWillBeContinued = checkMessageWillBeContinued(message, nextMessage);
        const flatTopBorderStyles = messageWillBeContinued ? messageBelongsToCurrentUser ? "rounded-tr-sm" : "rounded-tl-sm" : "";

        return `${messageOrientationStyle} ${messageBg} ${tailStyles} ${flatTopBorderStyles}`;
    };
    const checkMessageWillBeContinued = (message:Message|undefined, nextMessage:Message|undefined):boolean => {
        if (!nextMessage || !message) {
            return false;
        }

        const messagesHasSomeAuthor = message.user_id === nextMessage.user_id;
        const messagesTimeIntervalInMs = Math.abs(new Date(nextMessage.created_at!).getTime() - new Date(message.created_at!).getTime());
        const messagesHasIntervalLessThanMinute = messagesTimeIntervalInMs < 1000 * 60;

        return messagesHasSomeAuthor && messagesHasIntervalLessThanMinute;
    };

    return (
        <>
            {renderMessages()}
        </>
    );
};
