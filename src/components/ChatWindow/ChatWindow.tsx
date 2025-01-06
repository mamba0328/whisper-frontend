import React, { useState, useEffect, useContext } from "react";

import { CurrentUserIdContext } from "../../context/CurrentUserIdContext/CurrentUserIdContext";

import { socket } from "../../services/SocketService/SocketService";

import { TopNav } from "./TopNav/TopNav";
import { MessageList } from "./MessageList/MessageList";
import { NewMessageForm } from "./NewMessageForm/NewMessageForm";
import { NewMediaMessageForm } from "./NewMediaMessageForm/NewMediaMessageForm";

import { Chat, User, MessagePayload, Message, MessageSeenBy } from "../../types/types";
import { useGlobalStore } from "../../store/store";
import ActionPopup from "./ActionPopup/ActionPopup";
import { saveImg } from "../../services/UserRequestsService/UserRequestsService";

type EditMessageText = Message | null;
type Media = null | File

type Props = {
    chatData: Chat,
}

export function ChatWindow ({ chatData } : Props) {
    const { _id: chatId } = chatData ?? {};
    const { currentUserId } = useContext(CurrentUserIdContext);

    const { chatMessages, messageAtAction } = useGlobalStore();
    const { updateChatsPreviewMessage, initChatMessages, updateMessage, addMessage, addViewer } = useGlobalStore();
    const { closeActionPopup, resetActionPopup } = useGlobalStore();

    const [pendingMessages, setPendingMessages] = useState([] as MessagePayload[]);
    const [contact, setContact] = useState({} as User);
    const [messageImg, setMessageImg] = useState(null as Media);
    const [editMessage, setEditMessage] = useState(null as EditMessageText);

    useEffect(() => {
        function handleNewMessage (newMessage:Message) {
            if (chatId !== newMessage.chat_id) {
                return;
            }
            addMessage(newMessage);
            updateChatsPreviewMessage(newMessage);
        }

        function handleMessageWasSeen (messageSeenBy:MessageSeenBy) {
            addViewer(messageSeenBy);
        }

        socket.on("newMessage", handleNewMessage);
        socket.on("messageWasSeen", handleMessageWasSeen);

        return () => {
            socket.off("newMessage", handleNewMessage);
            socket.off("messageWasSeen", handleMessageWasSeen);
        };
    }, [chatMessages]);

    useEffect(() => {
        if (chatId) {
            void initChatMessages(chatId);
        }

        socket.emit("enterRoom", chatId);
        return () => {
            socket.emit("leaveRoom", chatId);
        };
    }, [chatData]);

    useEffect(() => {
        void resetActionPopup();
        getSetContact();
    }, [chatData]);

    const getSetContact = () => {
        if (chatData.chat_users) {
            const contact = chatData.chat_users.find((user) => user._id !== currentUserId)!;
            return setContact(contact);
        }
    };

    const handleImgInput = (event:InputEvent) => {
        // @ts-ignore
        const [file]:[File] = event.target.files;

        file && setMessageImg(file);
    };
    const handleStartMessageEdit = () => {
        setEditMessage(messageAtAction);
        closeActionPopup();
    };

    const handleCancelEdit = () => {
        setEditMessage(null);
        resetActionPopup();
    };

    const handleSendMessage = (messagePayload:MessagePayload) => {
        try {
            setPendingMessages([messagePayload]);

            socket.emit("createMessage", messagePayload, (response:Message) => {
                setPendingMessages((chatMessages) => chatMessages.filter((item) => JSON.stringify(item) !== JSON.stringify(messagePayload)));
                chatMessages?.length && addMessage(response);
                updateChatsPreviewMessage(response);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSendTextMessage = (messageBody:string) => {
        if (!messageBody.trim().length && !messageImg) {
            return console.log("No empty messages allowed");
        }

        if (!chatId || !currentUserId) {
            return console.log("Some key value is missing to send message");
        }

        const messagePayload:MessagePayload = { body: messageBody, chat_id: chatId, user_id: currentUserId };
        handleSendMessage(messagePayload);
    };

    const handleSendMediaMessage = async (messageBody:string, imgFormData:FormData) => {
        if (!messageBody.trim().length && !messageImg) {
            return console.log("No empty messages allowed");
        }

        if (!chatId || !currentUserId) {
            return console.log("Some key value is missing to send message");
        }

        if (!imgFormData) {
            return console.log("Img is required");
        }

        const message_img = await saveImg(imgFormData);

        const messagePayload:MessagePayload = { body: messageBody, chat_id: chatId, user_id: currentUserId, message_img };

        handleSendMessage(messagePayload);
    };

    const handleUpdateMessage = async (newMessageBody:string) => {
        try {
            if (!editMessage?._id) {
                return;
            }

            const response:Message | null = await socket.timeout(10_000).emitWithAck("updateMessage", { ...editMessage, body: newMessageBody });

            if (!response) {
                throw new Error("Can't update");
            }

            updateMessage(response);

            const isPreviewMessage = chatData.chat_messages![0]!._id === editMessage?._id;
            isPreviewMessage && updateChatsPreviewMessage(response);

            handleCancelEdit();
        } catch (error) {
            console.log(error);
        }
    };

    if (!chatId) {
        return (
            <section className={"hidden sm:grid place-content-center bg-dark-message-background-color border border-dark-message-background-color w-full "}>
                <p className={"mx-[0.5rem] p-[0.5rem] px-[1rem] rounded-3xl bg-input-search-background-color text-secondary-text-color"}>
                      "Select open chat or contact to start messaging"
                </p>
            </section>
        );
    }

    return (
        <section className={"hidden sm:flex flex-col items-center justify-start place-content-center bg-gradient-to-tl from-dark-message-background-color to-secondary-color from-10% border border-dark-message-background-color w-full overflow-hidden"}>
            <ActionPopup handleStartMessageEdit={handleStartMessageEdit} chatData={chatData}/>
            {messageImg && <NewMediaMessageForm onNewMediaMessageFormClose={() => setMessageImg(null)} handleSendMessage={handleSendMediaMessage} messageImg={messageImg} value={editMessage?.body ?? null} />}
            <TopNav contact={contact} chatId={chatId}/>
            <MessageList currentUserId={currentUserId} messages={chatMessages} pendingMessages={pendingMessages}/>
            <NewMessageForm chatId={chatId} handleSendMessage={handleSendTextMessage} handleUpdateMessage={handleUpdateMessage} value={editMessage?.body ?? null} handleCancelEdit={handleCancelEdit} handleFileInput={handleImgInput}/>
        </section>
    );
}

