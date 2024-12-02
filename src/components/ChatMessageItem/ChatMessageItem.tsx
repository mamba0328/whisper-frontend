import React, { useRef, useEffect, useContext, useState, } from "react";

import { CurrentUserIdContext } from "../../context/CurrentUserIdContext/CurrentUserIdContext";
import useMessageIsOnScreen from "../../hooks/useMessageIsOnScreen";

import { viewMessage, getMessageImg } from "../../services/UserRequestsService/UserRequestsService";

import { getFormatedMessageTime } from "../../utils/helpers";

import { Message } from "../../types/types";

type MessageImg = null | string;

type Props = {
    message: Message,
    messageStyles: string,
    orientation: "left" | "right",
    handleOnRightClick?: (e:React.MouseEvent, message:Message) => void,
    updateMessagesOnViewed?: (viewedMessage:Message) => void,
    wrapperRef?: React.RefObject<HTMLElement>,
}
function ChatMessageItem ({ message, handleOnRightClick, orientation, updateMessagesOnViewed = () => {}, messageStyles, wrapperRef }:Props) {
    const [messageImg, setMessageImg] = useState(null as MessageImg);
    const { currentUserId } = useContext(CurrentUserIdContext);
    const chatItemRef = useRef(null);

    const observerOptions = {
        rootMargin: "0px",
        threshold: 0.1,
        root: wrapperRef!.current,
        message // It's only job to trigger inner useEffect of useOnScreen hook.
    };

    const onScreen = useMessageIsOnScreen(chatItemRef, observerOptions);

    useEffect(() => {
        const hasImage = !!message.message_imgs?.length;

        if (hasImage) {
            void downloadImgFile();
        }
    }, [message]);

    useEffect(() => {
        const canAddView = onScreen && !messagesBelongsToCurrentUser && !messageWasSeenByCurrentUser;

        if (canAddView) {
            void addUserToTheMessageViewers();
        }
    }, [message, onScreen]);


    const messageWasSeenByCurrentUser = !!message.message_seen_by?.find((item) => item.user_id === currentUserId);

    const userMessageWasSeenByContact = !!message.message_seen_by?.find((item) => item.user_id !== currentUserId);

    const messagesBelongsToCurrentUser = message.user_id === currentUserId;

    const getViewMessagePayload = () => {
        return {
            message_id: message._id!,
            user_id: currentUserId!
        };
    };

    const downloadImgFile = async () => {
        try {
            if (!message.message_imgs?.length) return console.log("No imgs in message");

            const imgsId = message.message_imgs[0]?._id;
            const imgFile = await getMessageImg(imgsId);

            setMessageImg(imgFile);
        } catch (error) {
            console.log(error);
        }
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

    const handleOnContextMenu = (e:React.MouseEvent, message:Message) => {
        handleOnRightClick && handleOnRightClick(e, message);
    };

    const isMediaMessage = !message.body && message.message_imgs;

    return (
        <li ref={chatItemRef} onContextMenu={(e) => handleOnContextMenu(e, message)} className={`flex flex-col ${orientation === "left" ? "self-start" : "self-end"}`}>
            <div className={`text-primary-text-color rounded-xl w-fit pl-[8px] py-[2px] relative ${messageStyles}`}>
                {messageImg && <div className={"flex justify-center"}>
                    {/* @ts-ignore*/}
                    <img src={`data:${message.message_imgs.mimetype};base64,${messageImg}`} className={"max-w-[300px] max-h-[400px] rounded-md"} alt={"message image"}/>
                </div>}
                <p className={`${isMediaMessage && "pb-1"}`}>{message.body}</p>
                <span className={"absolute right-[25px] bottom-[3px] text-xs text-primary-text-color font-light opacity-80"}>{ message ? getFormatedMessageTime(message.created_at!) : ""}</span>
                {messagesBelongsToCurrentUser && <div className={`absolute right-[10px] bottom-[9px] z-10 ${userMessageWasSeenByContact ? "message-check-mark_double" : "message-check-mark"}`}></div>}
            </div>
        </li>
    );
}

export default ChatMessageItem;
