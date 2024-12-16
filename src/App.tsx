import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { CurrentUserIdContextProvider } from "./context/CurrentUserIdContext/CurrentUserIdContext";

import { router } from "./router";

import "./style/index.css";
import { Message } from "./types/types";
import { socket } from "./services/SocketService/SocketService";
import { useGlobalStore } from "./store/store";
const App = () => {
    const { updateChatsPreviewMessage } = useGlobalStore();

    useEffect(() => {
        function handleNewMessage (newMessage:Message) {
            updateChatsPreviewMessage(newMessage);
        }

        socket.on("newMessageNotification", handleNewMessage);

        return () => {
            socket.off("newMessageNotification", handleNewMessage);
        };
    }, []);

    return (
        <main className={"font-regular"}>
            <CurrentUserIdContextProvider>
                <RouterProvider router={router} />
            </CurrentUserIdContextProvider>
        </main>
    );
};

export default App;
