import React, { useRef } from "react";
import { ActionButton } from "../ActionButton/ActionButton";
import { createNewMessage } from "../../services/UserRequestsService/UserRequestsService";
import { MessagePayload } from "../../types/types";

type Props = {
    chatId?: string,
    currentUserId: string | null,
    handleSubmit: CallableFunction,
}
export const NewMessageForm = ({ chatId, currentUserId, handleSubmit }:Props) => {
    const inputRef = useRef(null);

    const renderInput = () => {
        return (
            <div className={"flex items-center bg-surface-color px-[25px] rounded-2xl relative rounded-br-sm tail__surface-color w-full max-w-[600px] laptop:min-w-[650px] mb-[40px]"}>
                <div suppressContentEditableWarning={true} ref={inputRef} contentEditable dir={"auto"} className={"bg-surface-color resize-none focus:outline-none w-full min-h-[50px] pt-[11px] pb-[9px] text-primary-text-color caret-primary-text-color max-h-[300px] overflow-y-auto"}>
                </div>
            </div>
        );
    };

    // @ts-ignore
    const onClick = () => void handleSubmit(inputRef.current.innerText);

    return (
        <form className={"w-full flex justify-center laptop:pl-[60px] gap-[10px]"}>
            {renderInput()}
            <ActionButton onClick={onClick} styles={"grid place-content-center"}>
                <img src={"/assets/imgs/svg/paper_plane.svg"}/>
            </ActionButton>
        </form>
    );
};
