import React, { useState } from "react";
import { Input } from "../Input/Input";

export const SearchInput = () => {
    const [inputValue, setInputValue] = useState("");
    const inputIsNotEmpty = inputValue.length;


    const pseudoBeforeStyles = "before:content-[''] before:absolute before:inline-block before:min-w-[15px] before:min-h-[15px] before:border-2 before:border-secondary-color before:rounded-full before:top-[40%] before:-translate-y-1/2 before:left-[20px]  [&:has(input:focus)]:before:border-primary-color";

    const pseudoAfterStyles = "after:content-[''] after:absolute after:inline-block after:min-w-[2px] after:min-h-[10px] after:bg-secondary-color  after:left-[35px] after:top-1/2 after:-rotate-45 [&:has(input:focus)]:after:bg-primary-color";

    const onValid = (value:string) => {
        const valueIsNotEmpty = value.length;
        const valueStartsOrConsistsOfSpaces = !value.trim().length;

        if (valueIsNotEmpty && valueStartsOrConsistsOfSpaces) {
            return false;
        }

        return true;
    };
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value);

    const clearInput = () => setInputValue("");

    return (
        <Input value={inputValue} onChange={handleChange} onValid={onValid} legend={""} inputTags={{ type: "text", id: "search", name: "search", placeholder: "Search", autocomplete: "off" }} wrapperClassName={`pt-0 p-0 rounded-3xl  ${pseudoBeforeStyles} ${pseudoAfterStyles}`} inputClassName={"rounded-3xl bg-input-search-background-color focus:bg-transparent py-[10px] px-[50px]"}>
            { inputIsNotEmpty
                ? <button type={"button"} onClick={clearInput}>
                    <img src={"/assets/imgs/svg/x_icon.svg"} className={"absolute max-w-[15px] top-1/2 -translate-y-1/2 right-[20px]"}/>
                </button> : null
            }
        </Input>
    );
};

