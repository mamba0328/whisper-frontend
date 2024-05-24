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
    return (
        <div onMouseLeave={onClose} onContextMenu={(e) => e.preventDefault()} style={position} className={"grid place-content-center fixed p-[50px] z-20 -translate-x-[50px] -translate-y-[50px] [&_li]:menu-item"}>
            <div className={"p-[5px] rounded-lg bg-surface-color opacity-95"}>
                {children}
            </div>
        </div>
    );
};

