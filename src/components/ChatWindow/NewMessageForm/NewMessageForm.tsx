import React, { useRef, useEffect } from "react";
import { ActionButton } from "../../UI/ActionButton/ActionButton";
import { socket } from "../../../services/SocketService/SocketService";

type Props = {
    value: string | null,
    chatId: string,
    handleSendMessage: CallableFunction,
    handleUpdateMessage: CallableFunction,
    handleCancelEdit: CallableFunction,
    handleFileInput: CallableFunction,
}
export const NewMessageForm = ({ value, chatId, handleSendMessage, handleUpdateMessage, handleCancelEdit, handleFileInput }:Props) => {
    const isEditMode = !!value;
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            // @ts-ignore
            inputRef.current.innerText = value;
        }
    }, [value]);
    const resetInput = () => {
        // @ts-ignore
        inputRef.current.innerText = null;
    };
    const handleSubmit = () => {
        // @ts-ignore
        isEditMode ? handleUpdateMessage(inputRef.current.innerText as string) : handleSendMessage(inputRef.current.innerText as string);
        resetInput();
    };

    const handleKeyDown = (e:React.KeyboardEvent) => {
        if (e.key === "Enter" && e.shiftKey) {
            return;
        }
        if (e.key === "Enter") {
            e.preventDefault();
            return handleSubmit();
        }
    };

    const handleOnInputFocus = () => {
        socket.emit("startWriting", chatId);
    };

    const handleOnInputBlur = () => {
        socket.emit("stopWriting", chatId);
    };

    const renderEditBlock = () => {
        return (
            <div className={"flex items-center justify-start gap-5 w-full pt-1"}>
                <div>
                    <img src={"/assets/imgs/svg/edit_purple.svg"} className={"size-icon"}/>
                </div>
                <div className={"flex-grow border-l-2 border-primary-color bg-primary-color bg-opacity-20 text-sm pl-2 rounded select-none" }>
                    <p className={"text-primary-color"}>Editing</p>
                    <p className={"text-secondary-text-color"}>{value?.slice(0, 80)}</p>
                </div>
                <button type={"button"} onClick={() => void handleCancelEdit()} className={"p-[10px] hover:bg-primary-color hover:bg-opacity-20 hover:rounded-full"}>
                    <img src={"/assets/imgs/svg/x_icon_purple.svg"} className={"w-[15px] h-[15px]"}/>
                </button>
            </div>
        );
    };
    const renderInput = () => {
        return (
            <div className={"flex flex-col items-center bg-surface-color px-[25px] rounded-2xl relative rounded-br-sm tail__surface-color w-full max-w-[600px] laptop:min-w-[650px]"} onBlur={handleOnInputBlur} onFocus={ handleOnInputFocus}>
                {isEditMode ? renderEditBlock() : null}
                <div suppressContentEditableWarning={true} ref={inputRef} contentEditable dir={"auto"} className={"message-input bg-surface-color resize-none focus:outline-none w-full min-h-[50px] pt-[11px] pr-[15px] pb-[9px] text-primary-text-color caret-primary-text-color max-h-[300px] overflow-y-auto"} onKeyDown={(e) => handleKeyDown(e)}>
                    {value}
                </div>
                <label className={"absolute bottom-[12px] right-[12px] grid place-content-center w-[34px] h-[34px] rounded-full  hover:bg-secondary-text-color hover:bg-opacity-10"}>
                    <input onChange={(e) => void handleFileInput(e)} type={"file"} accept="image/*" className={"hidden"}/>
                    <img src={"/assets/imgs/svg/attachment.svg"} className={"w-[21px] h-[21px]"}/>
                </label>
            </div>
        );
    };

    return (
        <form className={"w-full flex justify-center laptop:pl-[60px] gap-[10px] pb-[50px]"} >
            {renderInput()}
            <ActionButton onClick={(handleSubmit)} styles={"grid place-content-center"}>
                <img src={"/assets/imgs/svg/paper_plane.svg"}/>
            </ActionButton>
        </form>
    );
};
