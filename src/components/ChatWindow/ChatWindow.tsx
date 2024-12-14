import React, { useState, useEffect, useContext } from "react";

import { CurrentUserIdContext } from "../../context/CurrentUserIdContext/CurrentUserIdContext";

import { socket } from "../../services/SocketService/SocketService";

import { Popup } from "../HOC/Popup/Popup";
import { TopNav } from "./TopNav/TopNav";
import { ChatMessages } from "./ChatMessages/ChatMessages";
import { NewMessageForm } from "./NewMessageForm/NewMessageForm";
import { NewMediaMessageForm } from "./NewMediaMessageForm/NewMediaMessageForm";

import { updateMessage, getUsersChatMessages, deleteMessage } from "../../services/UserRequestsService/UserRequestsService";
import { getArrayWithUpdatedItemByField } from "../../utils/helpers";


import { Chat, User, MessagePayload, Message } from "../../types/types";

type MessageAtAction = Message | null;
type EditMessageText = Message | null;
type Media = null | File

type Props = {
    chatId: string | undefined,
    selectedChat: Chat,
    updateChatLastMessage: (message:Message) => void,
}

export function ChatWindow ({ chatId, selectedChat, updateChatLastMessage } : Props) {
    const { chat_messages, chat_users } = selectedChat;

    const { currentUserId } = useContext(CurrentUserIdContext);

    const [pendingMessages, setPendingMessages] = useState([] as MessagePayload[]);
    const [messages, setMessages] = useState(chat_messages ?? []);
    const [contact, setContact] = useState({} as User);

    const [actionPopupIsOpen, setActionPopupIsOpen] = useState(false);
    const [actionPopupPosition, setActionPopupPosition] = useState({ top: "", left: "" });
    const [messageAtAction, setMessageAtAction] = useState(null as MessageAtAction);

    const [messageImg, setMessageImg] = useState(null as Media);

    const [editMessage, setEditMessage] = useState(null as EditMessageText);

    useEffect(() => {
        function addMessage (newMessage:Message) {
            if (chatId !== newMessage.chat_id) {
                return;
            }
            setMessages([newMessage, ...messages]);
        }

        socket.on("message", addMessage);

        return () => {
            socket.off("message", addMessage);
        };
    }, [messages]);

    useEffect(() => {
        void getSetChatMessages();

        socket.emit("enterRoom", chatId);
        return () => {
            socket.emit("leaveRoom", chatId);
        };
    }, [chatId]);

    useEffect(() => {
        void resetState();
        getSetContact();
    }, [selectedChat]);

    useEffect(() => {
        updateChatLastMessageIfChanged();
    }, [messages]);

    const resetState = () => {
        setActionPopupIsOpen(false);
        setActionPopupPosition({ top: "", left: "" });
        setMessageAtAction(null);
        setEditMessage(null);
    };
    const getSetContact = () => {
        if (selectedChat.chat_users) {
            const contact = chat_users.find((user) => user._id !== currentUserId)!;
            return setContact(contact);
        }
    };
    const getSetChatMessages = async () => {
        if (!chatId) {
            return;
        }
        try {
            const chatMessages = await getUsersChatMessages({ chat_id: chatId });
            setMessages(chatMessages);
        } catch (error) {
            console.log(error);
        }
    };

    const updateChatLastMessageIfChanged = () => {
        const propsLastMessage = selectedChat.chat_messages?.[0];
        const stateLastMessage = messages?.[0];

        const isNewMessage = propsLastMessage?._id !== stateLastMessage?._id;
        const isUpdatedMessage = JSON.stringify(propsLastMessage) !== JSON.stringify(stateLastMessage);

        if (stateLastMessage && isNewMessage || isUpdatedMessage) {
            updateChatLastMessage(stateLastMessage!);
        }
    };

    const handleSendMessage = async (messageBody:string, message_img?:File):Promise<void> => {
        try {
            if (!messageBody.trim().length && !messageImg) {
                return console.log("No empty messages allowed");
            }

            if (!chatId || !currentUserId) {
                return console.log("Some key value is missing to send message");
            }

            const messagePayload:MessagePayload = { body: messageBody, chat_id: chatId, user_id: currentUserId, ...messageImg && { message_img } };

            setPendingMessages([messagePayload]);

            socket.emit("message", messagePayload, (response:Message) => {
                setPendingMessages((messages) => messages.filter((item) => JSON.stringify(item) !== JSON.stringify(messagePayload)));
                setMessages((messages) => messages?.length ? [response, ...messages] : [response]);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const updateMessagesOnViewed = (viewedMessage:Message) => {
        const updatedMessages = getArrayWithUpdatedItemByField(messages, viewedMessage, { _id: viewedMessage._id! });
        setMessages(updatedMessages);
    };

    const openActionPopup = (e:React.MouseEvent, message: Message) => {
        setMessageAtAction(message);
        setActionPopupPosition({ top: `${e.clientY}px`, left: `${e.clientX}px` });
        setActionPopupIsOpen(true);
    };

    const closeActionPopup = (keepMessageAtAction?:boolean) => {
        setActionPopupIsOpen(false);
        !keepMessageAtAction && setMessageAtAction(null);
    };

    const handleCopyMessage = async () => {
        await navigator.clipboard.writeText(messageAtAction?.body ?? "");
        closeActionPopup();
    };

    const handleDeleteMessage = async () => {
        try {
            if (!messageAtAction) {
                return closeActionPopup();
            }
            const messageId = messageAtAction._id;
            const response = await deleteMessage(messageId!);
            response && setMessages(messages.filter((message) => message._id !== messageId));
        } catch (error) {
            console.log(error);
        } finally {
            closeActionPopup();
        }
    };

    const handleImgInput = (event:InputEvent) => {
        // @ts-ignore
        const [file]:[File] = event.target.files;

        file && setMessageImg(file);
    };
    const handleEditMessage = () => {
        setEditMessage(messageAtAction);
        closeActionPopup(true);
    };

    const handleCancelEdit = () => {
        setEditMessage(null);
        setMessageAtAction(null);
    };

    const handleUpdateMessage = async (newMessageBody:string) => {
        try {
            if (!editMessage?._id) {
                return;
            }

            const response = await updateMessage(editMessage._id, newMessageBody);

            if (!response) {
                return;
            }

            const updatedArray = getArrayWithUpdatedItemByField(messages, response, { _id: response._id! });
            setMessages(updatedArray);
            handleCancelEdit();
        } catch (error) {
            console.log(error);
        }
    };
    const renderActionPopup = () => {
        const messageAtActionBelongsToCurrentUser = messageAtAction?.user_id === currentUserId;

        return (
            <Popup position={actionPopupPosition} onClose={closeActionPopup}>
                <ul>
                    {messageAtActionBelongsToCurrentUser && <li key={"edit"} onClick={() => void handleEditMessage()}>
                        <button className={"text-primary-text-color flex gap-[20px] items-center justify-start px-1 mr-10]"}>
                            <img src={"/assets/imgs/svg/edit.svg"} className={"size-icon"}/>
                            <p>Edit</p>
                        </button>
                    </li>}
                    <li key={"copy"} onClick={() => void handleCopyMessage()}>
                        <button className={"text-primary-text-color flex gap-[20px] items-center justify-start px-1 mr-10"}>
                            <img src={"/assets/imgs/svg/copy.svg"} className={"size-icon"}/>
                            <p>Copy</p>
                        </button>
                    </li>
                    <li key={"delete"} onClick={() => void handleDeleteMessage()}>
                        <button className={"text-dark-danger-color flex gap-[20px] items-center justify-start px-1 mr-10"}>
                            <img src={"/assets/imgs/svg/trash-can.svg"} className={"size-icon"}/>
                            <p>Delete</p>
                        </button>
                    </li>
                </ul>
            </Popup>
        );
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
            {actionPopupIsOpen && renderActionPopup()}
            {messageImg && <NewMediaMessageForm onNewMediaMessageFormClose={() => setMessageImg(null)} handleSendMessage={handleSendMessage} messageImg={messageImg} value={editMessage?.body ?? null} />}
            <TopNav contact={contact}/>
            <ChatMessages currentUserId={currentUserId} messages={messages} pendingMessages={pendingMessages} handleOnRightClick={openActionPopup} updateMessagesOnViewed={updateMessagesOnViewed}/>
            <NewMessageForm handleSendMessage={handleSendMessage} handleUpdateMessage={handleUpdateMessage} value={editMessage?.body ?? null} handleCancelEdit={handleCancelEdit} handleFileInput={handleImgInput}/>
        </section>
    );
}

