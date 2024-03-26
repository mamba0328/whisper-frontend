import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
    styles?: string,
    onClick: CallableFunction,
    children?: string | React.ReactNode,
}

export const ActionButton = ({ styles, onClick, children }:Props) => {
    return (
        <button onClick={() => void onClick()} className={twMerge(`min-w-[54px] size-[54px] rounded-full bg-primary-color hover:bg-dark-primary-color text-primary-text-color ${styles}`)}>
            {children}
        </button>
    );
};
