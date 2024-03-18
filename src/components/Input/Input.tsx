import React from "react";
import { twMerge } from "tailwind-merge";

type InputTags = {
    name?: string,
    id: string
    placeholder?: string,
    type: string,
    autoComplete?: "off",
}

type Props = {
    inputClassName?: string,
    legend: string,
    inputTags: InputTags,
    wrapperClassName?: string,
    children?: React.ReactNode,
    value?: string,
    onChange?: CallableFunction,
    onValid?: CallableFunction,
}

export const Input = ({ value, legend, inputTags, inputClassName, wrapperClassName, children, onChange, onValid }:Props) => {
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>):void => {
        if (!onChange) return;

        if (onValid && onValid(event.target.value)) {
            onChange(event);
        }
    };


    return (
        <label>
            <fieldset className={twMerge("w-full p-[7px] pt-[2px] rounded-md border border-input-search-border-color hover:border-primary-color [&>legend]:hover:text-primary-color [&:has(input:focus)]:border-2  [&:has(input:focus)]:border-primary-color [&:has(input:focus)>legend]:font-medium relative", wrapperClassName)}>
                <legend className={"ml-[5px] text-xs text-secondary-text-color "}>{legend}</legend>
                <input value={value} {...inputTags} className={twMerge("focus:outline-none bg-transparent w-full h-full py-[5px] px-[10px] text-primary-text-color placeholder-secondary-color caret-primary-text-color ", inputClassName)} onChange={(event) => handleChange(event)}/>
                {children}
            </fieldset>
        </label>
    );
};
