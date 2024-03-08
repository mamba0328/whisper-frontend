import React from "react";

type InputTags = {
    type: string,
    name?: string,
    id: string
    placeholder?: string,
}

type Props = {
    legend: string,
    inputTags: InputTags,
    wrapperClassName?: string,
}

export const Input = ({ legend, inputTags, wrapperClassName }:Props) => {
    return (
        <label className={wrapperClassName}>
            <fieldset className={"w-full p-[7px] pt-[2px] rounded-md border border-input-search-border-color hover:border-primary-color [&>legend]:hover:text-primary-color [&:has(input:focus)]:border-2 [&:has(input:focus)>legend]:font-medium"}>
                <legend className={"ml-[5px] text-xs text-secondary-text-color "}>{legend}</legend>
                <input {...inputTags} className={"focus:outline-none bg-transparent w-full h-full py-[5px] px-[10px] text-primary-text-color placeholder-secondary-color"}/>
            </fieldset>
        </label>
    );
};
