import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
    styles?: string,
    onClick: CallableFunction,
    children?: string | React.ReactNode,
    disabled?: boolean,
}

export const ActionButton = ({ styles, onClick, children, disabled }:Props) => {
    return (
        <button disabled={disabled} onClick={() => void onClick()} type={"button"} className={twMerge(`min-w-[54px] size-[54px] rounded-full bg-primary-color hover:bg-dark-primary-color text-primary-text-color self-end ${styles}`)}>
            {children}
        </button>
    );
};
