import React, { createContext, useState } from "react";

type Props = {
    children?: React.ReactNode,
}
const defaultContextDispatch = (function () {}) as React.Dispatch<React.SetStateAction<string | null>>;


const userId = localStorage.getItem("userId") ?? null;

export const CurrentUserIdContext = createContext({ currentUserId: userId, setCurrentUserId: defaultContextDispatch });

export const CurrentUserIdContextProvider = ({ children }:Props) => {
    const [currentUserId, setCurrentUserId] = useState(userId);

    return <CurrentUserIdContext.Provider value={{ currentUserId, setCurrentUserId } }>
        {children}
    </CurrentUserIdContext.Provider>;
};
