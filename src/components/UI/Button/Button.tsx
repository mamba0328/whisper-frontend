import React from "react";

type Props = {
    size: "sm" | "md" | "lg",
    invert?: boolean,
    label: string,
    styles?: string,
}

export const Button = ({ label, size, styles, invert, ...props }:Props) => {
    const buttonStandartColors:string = "bg-primary-color text-primary-text-color hover:bg-dark-primary-color";
    const buttonInvertColors:string = "bg-surface-color text-primary-color hover:bg-light-primary-color";
    const buttonColors:string = invert
        ? buttonInvertColors
        : buttonStandartColors;

    return (
        <button {...props} className={`w-full w-button-${size} rounded-md py-[1rem] ${buttonColors} ${styles}`}>{label.toUpperCase()}</button>
    );
};
