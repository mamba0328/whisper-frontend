import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { CurrentUserIdContextProvider } from "./context/CurrentUserIdContext/CurrentUserIdContext";

import { router } from "./router";

import "./style/index.css";
import { Message, Typist } from "./types/types";
import { socket } from "./services/SocketService/SocketService";
import { useGlobalStore } from "./store/store";
const App = () => {
    const { updateChatsPreviewMessage, addTypist, removeTypist } = useGlobalStore();

    useEffect(() => {
        function handleNewMessage (newMessage:Message) {
            updateChatsPreviewMessage(newMessage);
        }
        socket.on("newMessageNotification", handleNewMessage);


        socket.on("userIsWriting", (userWritingInChat:Typist) => addTypist(userWritingInChat));
        socket.on("userStoppedWriting", (userWritingInChat:Typist) => removeTypist(userWritingInChat));

        return () => {
            socket.off("userIsWriting", (userWritingInChat:Typist) => addTypist(userWritingInChat));
            socket.off("userStoppedWriting", (userWritingInChat:Typist) => removeTypist(userWritingInChat));
        };
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
