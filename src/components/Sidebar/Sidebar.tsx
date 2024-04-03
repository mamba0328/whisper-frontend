import React from "react";
import { NavLink } from "react-router-dom";

import { getChatFormatedDate } from "../../utils/helpers";
import { handleProfileImgError } from "../../utils/helpers";

import { SearchInput } from "../SearchInput/SearchInput";
import { Chat, Message } from "../../types/types";


type Props = {
    chats: Array<Chat>,
    setSelectedChat: CallableFunction,
}
export const Sidebar = ({ chats, setSelectedChat, ...props }:Props) => {
    const renderChatItem = (chats:Array<Chat>) => {
        if (!chats.length) {
            return;
        }

        return chats.map((chatItem) => {
            const { is_group_chat, chat_users, chat_name, chat_messages } = chatItem;
            const chatImg = is_group_chat ? "/assets/imgs/svg/users.svg" : chat_users[0]!.user_profile_img_id;
            const chatTitle = is_group_chat ? chat_name : chat_users[0]!.username;
            const chatLastMessageBody = chat_messages![0]?.body;
            const chatLastMessageCreatedAt = chat_messages?.[0] ? getChatFormatedDate(chat_messages[0].created_at!) : "";

            const handleChatSelection = () => {
                setSelectedChat(chatItem);
            };

            return (
                <li key={chatItem._id}>
                    <NavLink className={"flex items-center min-h-[4.5rem] menu-item"} to={`/k/${chatItem._id}`} onClick={handleChatSelection}>
                        <div className={"w-[4rem] grid content-center"}>
                            <div className={"rounded-full bg-input-search-background-color size-[3.375rem]"}>
                                <img src={chatImg} alt={"user avatar"} onError={handleProfileImgError}/>
                            </div>
                        </div>
                        <div>
                            <h4 className={"text-primary-text-color font-medium"}>{chatTitle}</h4>
                            <p className={"line-clamp-1 text-secondary-text-color pr-[5px]"}>{chatLastMessageBody}</p>
                        </div>
                        <span className={"absolute right-[1rem] top-[0.75rem] text-sm text-secondary-text-color font-light"}>{chatLastMessageCreatedAt}</span>
                    </NavLink>
                </li>
            );
        });
    };

    return (
        <aside className={"bg-surface-color w-full max-w-full sm:min-w-[420px] sm:max-w-[420px] min-h-[100vh] overflow-hidden select-none"}>
            <div className={"p-1"}>
                <SearchInput/>
            </div>
            <nav className={"p-1"}>
                <ul className={"p-[0.2rem]"}>
                    {renderChatItem(chats)}
                </ul>
            </nav>
        </aside>
    );
};
