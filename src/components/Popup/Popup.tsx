import React from "react";

type Props = {
    children?: React.ReactNode,
    onClose: () => void,
    position?: {
        top?: string,
        left?: string,
    }
}
export const Popup = ({ children, onClose, position }:Props) => {
    // const propsPositionStyles = `top-[${position?.top}px] left-[${position?.left}px]`;
    // const defaultPositionStyles = "top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2";
    // const positionStyles = position ? propsPositionStyles : defaultPositionStyles;

    return (
        <div onMouseLeave={onClose} style={position} className={"grid place-content-center fixed p-[50px] z-10 -translate-x-[50px] -translate-y-[50px] [&_li]:menu-item"}>
            <div className={"p-[5px] rounded-lg bg-surface-color opacity-95"}>
                {children}
            </div>
        </div>
    );
};

