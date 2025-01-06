import React, { useRef, useEffect, useState } from "react";
import { ActionButton } from "../../UI/ActionButton/ActionButton";
import { Popup } from "../../UI/Popup/Popup";
import { useCloudinarySignature } from "../../../hooks/useCloudinarySignature";

type Props = {
    value: string | null,
    handleSendMessage: CallableFunction,
    onNewMediaMessageFormClose: () => void,
    messageImg: File,
}
export const NewMediaMessageForm = ({ value, handleSendMessage, onNewMediaMessageFormClose, messageImg }:Props) => {
    const inputRef = useRef(null);
    const [imgIsLoading, setImgIsLoading] = useState(true);
    const { signature, timestamp } = useCloudinarySignature();

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

    const getFormData = () => {
        const formData = new FormData();
        const key = process.env.CLOUDINARY_KEY;

        if (!key) {
            throw new Error("Bad API key");
        }

        if (!signature || !timestamp) {
            throw new Error("Bad signature");
        }

        formData.append("file", messageImg);
        formData.append("api_key", key);
        formData.append("signature", signature);
        formData.append("timestamp", timestamp);

        return formData;
    };
    const handleSubmit = () => {
        if (imgIsLoading) return;
        const formData = getFormData();
        const input = inputRef.current ?? {} as HTMLInputElement;
        const message = input.innerText;
        handleSendMessage(message, formData).finally(() => {
            resetInput();
            onNewMediaMessageFormClose();
        });
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

    const onImgLoad = (event:React.SyntheticEvent<HTMLImageElement, Event>) => {
        freeMemoryOnLoad(event);
        setImgIsLoading(false);
    };
    // @ts-ignore
    const freeMemoryOnLoad = (event) => URL.revokeObjectURL(`${event.target.src}`);
    const renderInput = () => {
        return (
            <div suppressContentEditableWarning={true} ref={inputRef} contentEditable dir={"auto"} className={"message-input_media bg-surface-color resize-none flex-grow focus:outline-none min-h-[50px] pt-[10px] pl-[15px] text-primary-text-color caret-primary-text-color max-h-[300px] overflow-y-auto"} onKeyDown={(e) => handleKeyDown(e)}>
                {value}
            </div>
        );
    };

    return (
        <Popup position={{ top: "0%", left: "0%" }} onClose={() => {}} wrapperStyles={"w-[100vw] h-[100vh] bg-popup-outer-bg translate-x-0 translate-y-0"} styles={"w-[400px] opacity-100 shadow-xl"}>
            <div className={"flex justify-start gap-[10px] items-center p-[10px]"}>
                <button type={"button"} onClick={onNewMediaMessageFormClose} className={"p-[10px] hover:bg-primary-color hover:bg-opacity-20 hover:rounded-full"}>
                    <img src={"/assets/imgs/svg/x_icon.svg"} className={"w-[15px] h-[15px]"}/>
                </button>
                <h2 className={"text-primary-text-color text-xl"}>Send Media</h2>
            </div>
            <div className={"grid place-content-center"}>
                {imgIsLoading && <h3 className={"text-primary-text-color font-bold"}>Loading...</h3> }
                <img src={URL.createObjectURL(messageImg)} onLoad={(e) => onImgLoad(e)} alt={"uplaoaded media"} className={"max-w-[300px] max-h-[400px] rounded-md"}/>
            </div>
            <form className={"w-full flex justify-center items-center gap-[10px] w-full max-w-[400px]"} >
                {renderInput()}
                <ActionButton onClick={handleSubmit} disabled={imgIsLoading} styles={"grid place-content-center min-w-[30px] size-[30px] mb-[10px] mr-[5px]"}>
                    <img src={"/assets/imgs/svg/paper_plane.svg"}/>
                </ActionButton>
            </form>
        </Popup>
    );
};
