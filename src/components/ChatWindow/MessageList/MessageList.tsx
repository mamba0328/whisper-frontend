import React, { useRef } from "react";

import ChatMessageItem from "../ChatMessageItem/ChatMessageItem";

import { Message, MessagePayload } from "../../../types/types";
import ChatPendingMessage from "../ChatPendingMessage/ChatPendingMessage";
import { useStore } from "../../../store/store";

type Props = {
    pendingMessages: Array<MessagePayload>
    messages: Array<Message> | undefined,
    currentUserId: string | null,
}
export const MessageList = ({ messages, currentUserId, pendingMessages }:Props) => {
    const { openActionPopup } = useStore();
    const messagesWrapperRef = useRef(null);
    const handleOnContextMenu = (e:React.MouseEvent, message:Message) => {
        e.preventDefault();
        openActionPopup(e, message);
    };
    const renderMessages = () => {
        const noMessages = !messages?.length;
        if (noMessages) {
            return <ul className={"flex flex-grow flex-col-reverse max-h-[85vh] w-full max-w-[650px] p-[5px]"}></ul>;
        }

        return <ul ref={messagesWrapperRef} className={"chat-messages flex flex-grow flex-col-reverse max-h-[82vh] w-full overflow-y-auto overflow-x-hidden scrollable"} onContextMenu={(e) => e.preventDefault()}>
            {pendingMessages.map((message, index) => {
                return <ChatPendingMessage orientation={"right"} message={message} messageStyles={"tail tail_secondary-color  rounded-br-none self-end bg-secondary-color text-primary-text-color rounded-xl w-fit px-[8px] py-[2px] relative pr-[40px] mb-[5px]"} key={index} />;
            })}
            {messages?.map((message, index) => {
                const prevMessage = messages?.[index - 1];
                const nextMessage = messages?.[index + 1];
                const messageStyles = getMessageStyles(message, prevMessage, nextMessage);
                const messageOrientation = getMessageOrientation(message);

                return <ChatMessageItem orientation={messageOrientation} message={message} messageStyles={messageStyles} key={message?._id || index} handleOnRightClick={handleOnContextMenu} wrapperRef={messagesWrapperRef}/>;
            })}
        </ul>;
    };

    const getMessageOrientation = (message: Message) => {
        const messageBelongsToCurrentUser = message.user_id === currentUserId;

        return messageBelongsToCurrentUser ? "right" : "left";
    };
    const getMessageStyles = (message:Message, prevMessage:Message|undefined, nextMessage:Message|undefined) => {
        const messageBelongsToCurrentUser = message.user_id === currentUserId;
        const messageOrientationStyle = messageBelongsToCurrentUser ? "self-end" : "self-start";
        const messageBg = messageBelongsToCurrentUser ? "bg-message-out-background-color" : "bg-surface-color";

        const pseudoElementStyles = messageBelongsToCurrentUser ? "tail" : "tail_inverse";

        const messageIsContinuingPrevious = checkMessageWillBeContinued(prevMessage, message);
        // eslint-disable-next-line
        const tailStyles = messageIsContinuingPrevious ? (messageBelongsToCurrentUser ? "rounded-br-sm" : "rounded-bl-sm") + ' mb-[3px]' : (messageBelongsToCurrentUser ? "rounded-br-none" : "rounded-bl-none") + ` ${pseudoElementStyles} mb-[5px]`;

        const messageDateStyles = messageBelongsToCurrentUser ? "[&>p]:pr-[60px] [&>span]:right-[25px]" : "[&>p]:pr-[40px] [&>span]:right-[6px]";
        const mediaMessageStyles = message.message_imgs?.length ? "pl-[8px] pr-[8px] pt-[8px]" : "";

        const messageWillBeContinued = checkMessageWillBeContinued(message, nextMessage);
        const flatTopBorderStyles = messageWillBeContinued ? messageBelongsToCurrentUser ? "rounded-tr-sm" : "rounded-tl-sm" : "";


        return `${messageOrientationStyle} ${messageBg} ${tailStyles} ${flatTopBorderStyles} ${messageDateStyles} ${mediaMessageStyles}`;
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
