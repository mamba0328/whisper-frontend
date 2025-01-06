import React, { useContext } from "react";

import { socket } from "../../../services/SocketService/SocketService";

import { useGlobalStore } from "../../../store/store";
import { CurrentUserIdContext } from "../../../context/CurrentUserIdContext/CurrentUserIdContext";

import { Popup } from "../../UI/Popup/Popup";

import { Chat, Message } from "../../../types/types";

type Props = {
    handleStartMessageEdit: () => void,
    chatData: Chat,
}
function ActionPopup ({ handleStartMessageEdit, chatData }:Props) {
    const { currentUserId } = useContext(CurrentUserIdContext);
    const { messageAtAction, actionPopupPosition, chatMessages } = useGlobalStore();
    const { deleteMessage, closeActionPopup, updateChatsPreviewMessage } = useGlobalStore();

    const isOpen = useGlobalStore((state) => !!state.actionPopupPosition);
    const messageAtActionBelongsToCurrentUser = messageAtAction?.user_id === currentUserId;

    const handleCopyMessage = async () => {
        await navigator.clipboard.writeText(messageAtAction?.body ?? "");
        closeActionPopup();
    };

    const handleDeleteMessage = async () => {
        try {
            if (!messageAtAction) {
                return closeActionPopup();
            }

            const response:boolean = await socket.timeout(10_000).emitWithAck("deleteMessage", messageAtAction);

            if (!response) {
                throw new Error("Can't delete");
            }

            deleteMessage(messageAtAction._id!);

            const isPreviewMessage = chatData.chat_messages![0]!._id === messageAtAction._id;
            isPreviewMessage && updateChatsPreviewMessage(chatMessages[1] ?? {} as Message);
        } catch (error) {
            console.log(error);
        } finally {
            closeActionPopup();
        }
    };


    return (
        <>
            {isOpen &&
            <Popup position={actionPopupPosition} onClose={closeActionPopup}>
                <ul className={"[&_button]:flex [&_button]:gap-[20px] [&_button]:items-center [&_button]:justify-start [&_button]:px-1 [&_button]:mr-10] [&_img]:size-icon"}>
                    {messageAtActionBelongsToCurrentUser && <li key={"edit"} onClick={() => void handleStartMessageEdit()}>
                        <button className={"text-primary-text-color"}>
                            <img src={"/assets/imgs/svg/edit.svg"} alt={"edit"}/>
                            <p>Edit</p>
                        </button>
                    </li>}
                    <li key={"copy"} onClick={() => void handleCopyMessage()}>
                        <button className={"text-primary-text-color"}>
                            <img src={"/assets/imgs/svg/copy.svg"} alt={"copy"}/>
                            <p>Copy</p>
                        </button>
                    </li>
                    <li key={"delete"} onClick={() => void handleDeleteMessage()}>
                        <button className={"text-dark-danger-color"}>
                            <img src={"/assets/imgs/svg/trash-can.svg"} alt={"delete"}/>
                            <p>Delete</p>
                        </button>
                    </li>
                </ul>
            </Popup>
            }
        </>
    );


}

export default ActionPopup;
