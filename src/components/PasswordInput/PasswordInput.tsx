import React, { useState } from "react";
import { Input } from "../Input/Input";

export const PasswordInput = () => {
    const [hidePassword, setHidePassword] = useState(true);

    const hidePasswordImgPath = "/assets/imgs/svg/closed_eye.svg";
    const showPasswordImgPath = "/assets/imgs/svg/opened_eye.svg";

    const inputType = hidePassword ? "password" : "text";
    const currentImg = hidePassword ? hidePasswordImgPath : showPasswordImgPath;

    const toggleInputType = () => setHidePassword(!hidePassword);

    return (
        <Input legend={"Password*"} inputTags={ { type: `${inputType}`, id: "password", name: "password", placeholder: "********" }}>
            <button type={"button"}>
                <img alt={"show password toggle"} src={currentImg} onClick={toggleInputType} className={"absolute top-[2px] right-[10px] w-[24px] cursor-pointer"}/>
            </button>
        </Input>
    );
};
