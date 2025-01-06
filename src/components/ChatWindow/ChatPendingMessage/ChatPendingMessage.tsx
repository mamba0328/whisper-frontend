import React from "react";

import { MessagePayload } from "../../../types/types";


type Props = {
    message: MessagePayload,
    messageStyles: string,
    orientation: "left" | "right",
    wrapperRef?: React.RefObject<HTMLElement>,
}
function ChatMessageItem ({ message, orientation, messageStyles }:Props) {

    const isMediaMessage = !message.body && message.message_img;

    return (
        <li className={`flex flex-col ${orientation === "left" ? "self-start" : "self-end"}`}>
            <div className={`text-primary-text-color rounded-xl w-fit pl-[8px] py-[2px] relative ${messageStyles} ${message.message_img && "pl-[8px] pr-[8px] pt-[8px]"}`}>
                {message.message_img && <div className={"flex justify-center"}>
                    <img src={message.message_img.public_id} className={"max-w-[300px] max-h-[400px] rounded-md"} alt={"message image"}/>
                </div>}
                <p className={`${isMediaMessage && "pb-1"}`}>{message.body}</p>
            </div>
        </li>
    );
}

export default ChatMessageItem;
