import React, { createContext, useState } from "react";

type Props = {
    children?: React.ReactNode,
}

type userId = string | null;

const defaultContextDispatch = (function () {}) as React.Dispatch<React.SetStateAction<string | null>>;

export const CurrentUserIdContext = createContext({ currentUserId: null as userId, setCurrentUserId: defaultContextDispatch });

export const CurrentUserIdContextProvider = ({ children }:Props) => {
    const [currentUserId, setCurrentUserId] = useState(null as userId);

    return <CurrentUserIdContext.Provider value={{ currentUserId, setCurrentUserId } }>
        {children}
    </CurrentUserIdContext.Provider>;
};
