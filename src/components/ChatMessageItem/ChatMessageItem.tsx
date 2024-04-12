import React, { useRef, useEffect, useContext } from "react";

import { CurrentUserIdContext } from "../../context/CurrentUserIdContext/CurrentUserIdContext";
import useMessageIsOnScreen from "../../hooks/useMessageIsOnScreen";

import { viewMessage } from "../../services/UserRequestsService/UserRequestsService";

import { getFormatedMessageTime } from "../../utils/helpers";

import { Message } from "../../types/types";


type Props = {
    message: Message,
    messageStyles: string,
    handleOnRightClick?: (e:React.MouseEvent, message:Message) => void,
    updateMessagesOnViewed: (viewedMessage:Message) => void,
    wrapperRef?: React.RefObject<HTMLElement>,
}
function ChatMessageItem ({ message, handleOnRightClick, updateMessagesOnViewed, messageStyles, wrapperRef }:Props) {
    const { currentUserId } = useContext(CurrentUserIdContext);
    const chatItemRef = useRef(null);
    const observerOptions = {
        rootMargin: "0px",
        threshold: 0.1,
        root: wrapperRef!.current,
        message // It's only job to trigger inner useEffect of useOnScreen hook.
    };

    const onScreen = useMessageIsOnScreen(chatItemRef, observerOptions);

    const checkMessageWasSeenByCurrentUser = ():boolean => {
        return !!message.message_seen_by?.find((item) => item.user_id === currentUserId);
    };

    const messagesBelongsToCurrentUser = ():boolean => {
        return message.user_id === currentUserId;
    };

    const getViewMessagePayload = () => {
        return {
            message_id: message._id!,
            user_id: currentUserId!
        };
    };
    const addUserToTheMessageViewers = async ():Promise<void> => {
        try {
            const payload = getViewMessagePayload();
            const response = await viewMessage(payload);
            const viewedMessage = { ...message, message_seen_by: [...message.message_seen_by!, response] };
            updateMessagesOnViewed(viewedMessage);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const canAddView = onScreen && !messagesBelongsToCurrentUser() && !checkMessageWasSeenByCurrentUser();

        if (canAddView) {
            void addUserToTheMessageViewers();
        }
    }, [message, onScreen]);

    const handleOnContextMenu = (e:React.MouseEvent, message:Message) => {
        handleOnRightClick && handleOnRightClick(e, message);
    };

    return (
        <li ref={chatItemRef} className={`text-primary-text-color rounded-xl w-fit px-[8px] py-[2px] relative ${messageStyles} pr-[40px]`} onContextMenu={(e) => handleOnContextMenu(e, message)}>
            {message.body}
            <span className={"absolute right-[6px] bottom-[3px] text-xs text-primary-text-color font-light opacity-80 "}>{ message ? getFormatedMessageTime(message.created_at!) : ""}</span>
        </li>
    );
}

export default ChatMessageItem;
