import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
    children?: React.ReactNode,
    onClose: () => void,
    position?: {
        top?: string,
        left?: string,
    }
    wrapperStyles?: string,
    styles?: string,
}
export const Popup = ({ children, onClose, position, wrapperStyles, styles }:Props) => {
    return (
        <div onMouseLeave={onClose} onContextMenu={(e) => e.preventDefault()} style={position} className={twMerge("grid place-content-center fixed p-[50px] z-20 -translate-x-[50px] -translate-y-[50px] [&_li]:menu-item", wrapperStyles)}>
            <div className={twMerge("p-[5px] rounded-lg bg-surface-color opacity-95", styles)}>
                {children}
            </div>
        </div>
    );
};

