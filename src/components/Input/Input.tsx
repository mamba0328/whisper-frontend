import React, { useState } from "react";
import hidePasswordImg from "../../assets/imgs/svg/closed_eye.svg";
import showPasswordImg from "../../assets/imgs/svg/opened_eye.svg";

type InputTags = {
    name?: string,
    id: string
    placeholder?: string,
}

type Props = {
    type: string,
    legend: string,
    inputTags: InputTags,
    wrapperClassName?: string,
}

export const Input = ({ type, legend, inputTags, wrapperClassName }:Props) => {
    const [hidePassword, setHidePassword] = useState(true);

    const isPasswordInput = type === "password";
    const inputType = !isPasswordInput ? type : hidePassword ? "password" : "text";
    const currentImg = hidePassword ? hidePasswordImg : showPasswordImg;

    const toggleInputType = () => setHidePassword(!hidePassword);

    return (
        <label className={wrapperClassName}>
            <fieldset className={"w-full p-[7px] pt-[2px] rounded-md border border-input-search-border-color hover:border-primary-color [&>legend]:hover:text-primary-color [&:has(input:focus)]:border-2 [&:has(input:focus)>legend]:font-medium relative"}>
                <legend className={"ml-[5px] text-xs text-secondary-text-color "}>{legend}</legend>
                <input type={inputType} {...inputTags} className={"focus:outline-none bg-transparent w-full h-full py-[5px] px-[10px] text-primary-text-color placeholder-secondary-color"}/>

                { isPasswordInput &&
                    <img alt={"show password toggle"} src={currentImg} onClick={toggleInputType} className={"absolute top-[2px] right-[10px] w-[24px] cursor-pointer"}/>
                }
            </fieldset>
        </label>
    );
};
