import React, { useRef, useEffect, useContext } from "react";

import { CurrentUserIdContext } from "../../../context/CurrentUserIdContext/CurrentUserIdContext";
import useMessageIsOnScreen from "../../../hooks/useMessageIsOnScreen";

import { viewMessage } from "../../../services/UserRequestsService/UserRequestsService";

import { getArrayWithUpdatedItemByField, getFormatedMessageTime } from "../../../utils/helpers";

import { Message } from "../../../types/types";
import MessageImg from "../MessageImg/MessageImg";
import { useStore } from "../../../store/store";
import { socket } from "../../../services/SocketService/SocketService";

type Props = {
    message: Message,
    messageStyles: string,
    orientation: "left" | "right",
    handleOnRightClick?: (e:React.MouseEvent, message:Message) => void,
    wrapperRef?: React.RefObject<HTMLElement>,
}
function ChatMessageItem ({ message, handleOnRightClick, orientation, messageStyles, wrapperRef }:Props) {
    const { chatMessages, setChatMessages } = useStore();
    const { currentUserId } = useContext(CurrentUserIdContext);
    const chatItemRef = useRef(null);

    const observerOptions = {
        rootMargin: "0px",
        threshold: 0.1,
        root: wrapperRef!.current,
        message // It's only job to trigger inner useEffect of useOnScreen hook.
    };

    const onScreen = useMessageIsOnScreen(chatItemRef, observerOptions as IntersectionObserverInit);
    const hasImage = !!message.message_imgs?.length;


    useEffect(() => {
        const canAddView = onScreen && !messagesBelongsToCurrentUser && !messageWasSeenByCurrentUser;

        if (canAddView) {
            void addUserToTheMessageViewers();
        }
    }, [message, onScreen]);

    const updateMessagesOnViewed = (viewedMessage:Message) => {
        const updatedMessages:Message[] = getArrayWithUpdatedItemByField(chatMessages, viewedMessage, { _id: viewedMessage._id! });
        setChatMessages(updatedMessages);
    };

    const messageWasSeenByCurrentUser = !!message.message_seen_by?.find((item) => item.user_id === currentUserId);

    const userMessageWasSeenByContact = !!message.message_seen_by?.find((item) => item.user_id !== currentUserId);

    const messagesBelongsToCurrentUser = message.user_id === currentUserId;

    const getViewMessagePayload = () => {
        return {
            message_id: message._id!,
            chat_id: message.chat_id,
            user_id: currentUserId!
        };
    };

    const addUserToTheMessageViewers = async ():Promise<void> => {
        try {
            const payload = getViewMessagePayload();

            const response = await socket.timeout(10_000).emitWithAck("viewMessage", payload);

            if (!response) {
                return;
            }

            const viewedMessage = { ...message, message_seen_by: [...message.message_seen_by!, response] };
            updateMessagesOnViewed(viewedMessage);
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnContextMenu = (e:React.MouseEvent, message:Message) => {
        handleOnRightClick && handleOnRightClick(e, message);
    };

    const isMediaMessage = !message.body && message.message_imgs;

    return (
        <li ref={chatItemRef} onContextMenu={(e) => handleOnContextMenu(e, message)} className={`flex flex-col ${orientation === "left" ? "self-start" : "self-end"}`}>
            <div className={`text-primary-text-color rounded-xl w-fit pl-[8px] py-[2px] relative ${messageStyles}`}>
                {hasImage && <div className={"flex justify-center"}>
                    {message.message_imgs?.map((item) => <MessageImg {...item}/>)}
                </div>}
                <p className={`${isMediaMessage && "pb-1"}`}>{message.body}</p>
                <span className={"absolute right-[25px] bottom-[3px] text-xs text-primary-text-color font-light opacity-80"}>{ message ? getFormatedMessageTime(message.created_at!) : ""}</span>
                {messagesBelongsToCurrentUser && <div className={`absolute right-[10px] bottom-[9px] z-10 ${userMessageWasSeenByContact ? "message-check-mark_double" : "message-check-mark"}`}></div>}
            </div>
        </li>
    );
}

export default ChatMessageItem;
