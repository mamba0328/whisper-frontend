import React, { useRef, useEffect } from "react";
import { ActionButton } from "../ActionButton/ActionButton";
import { Popup } from "../Popup/Popup";

type Props = {
    value: string | null,
    handleSendMessage: CallableFunction,
    onNewMediaMessageFormClose: () => void,
}
export const NewMediaMessageForm = ({ value, handleSendMessage, onNewMediaMessageFormClose }:Props) => {
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
        handleSendMessage(inputRef.current.innerText as string);
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

    const renderInput = () => {
        return (
            <div suppressContentEditableWarning={true} ref={inputRef} contentEditable dir={"auto"} className={"message-input_media bg-surface-color resize-none flex-grow focus:outline-none min-h-[50px] pt-[10px] pl-[15px] text-primary-text-color caret-primary-text-color max-h-[300px] overflow-y-auto"} onKeyDown={(e) => handleKeyDown(e)}>
                {value}
            </div>
        );
    };

    return (
        <Popup position={{ top: "0%", left: "0%" }} onClose={() => {}} wrapperStyles={"w-[100vw] h-[100vh] bg-popup-outer-bg translate-x-0 translate-y-0"} styles={"w-[400px] opacity-100 shadow-xl"}>
            <div className={'flex justify-start gap-[10px] items-center'}>
                <button type={"button"} onClick={onNewMediaMessageFormClose} className={"p-[10px] hover:bg-primary-color hover:bg-opacity-20 hover:rounded-full"}>
                    <img src={"/assets/imgs/svg/x_icon.svg"} className={"w-[15px] h-[15px]"}/>
                </button>
                <h2 className={"text-primary-text-color text-xl"}>Send Media</h2>
            </div>
            <form className={"w-full flex justify-center items-center gap-[10px] w-full max-w-[400px]"} >
                {renderInput()}
                <ActionButton onClick={handleSubmit} styles={"grid place-content-center min-w-[30px] size-[30px] mb-[10px]"}>
                    <img src={"/assets/imgs/svg/paper_plane.svg"}/>
                </ActionButton>
            </form>
        </Popup>
    );
};
