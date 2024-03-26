import React, { useState } from "react";
import { ActionButton } from "../ActionButton/ActionButton";

type Props = {
    chatId: string | undefined,
    currentUserId: string | null,
}
export const NewMessageForm = ({ chatId, currentUserId }:Props) => {
    const [messageBody, setMessageBody] = useState("");

    const renderInput = () => {
        return (
            <div className={"flex items-center bg-surface-color px-[25px] rounded-2xl relative rounded-br-sm tail__surface-color w-full max-w-[600px] laptop:min-w-[650px] mb-[40px]"}>
                <div onChange={(event:React.ChangeEvent<HTMLInputElement>) => setMessageBody(event.target.value)} contentEditable className={"bg-surface-color resize-none focus:outline-none w-full min-h-[50px] pt-[11px] pb-[9px] text-primary-text-color caret-primary-text-color max-h-[300px] overflow-y-scroll"}>
                    {messageBody}
                </div>
            </div>
        );
    };

    return (
        <form className={"w-full flex justify-center laptop:pl-[60px] gap-[10px]"}>
            {renderInput()}
            <ActionButton onClick={() => {}} styles={"grid place-content-center"}>
                <img src={"/assets/imgs/svg/paper_plane.svg"}/>
            </ActionButton>
        </form>
    );
};
