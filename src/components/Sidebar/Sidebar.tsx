import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { CurrentUserIdContext } from "../../context/CurrentUserIdContext/CurrentUserIdContext";

import { getChatFormatedDate } from "../../utils/helpers";
import { handleProfileImgError } from "../../utils/helpers";

import { SearchInput } from "../HOC/SearchInput/SearchInput";
import { Chat } from "../../types/types";


type Props = {
    chats: Array<Chat>,
    setSelectedChat: CallableFunction,
}
export const Sidebar = ({ chats, setSelectedChat }:Props) => {
    const { currentUserId } = useContext(CurrentUserIdContext);

    const getDynamicChatItemStlyes = (active:boolean, unread:boolean):string => {
        const unreadStyles = "after:content-[''] after:absolute after:size-[15px] after:rounded-full after:bg-primary-color after:right-[1rem] after:top-[2.5rem]";
        const activeStyles = "bg-primary-color [&_p]:text-primary-text-color [&_span]:text-primary-text-color hover:bg-dark-primary-color";
        return `${active ? activeStyles : ""} ${unread ? unreadStyles : ""}`;
    };
    const renderChatItem = (chats:Array<Chat>) => {
        if (!chats.length) {
            return;
        }

        return chats.map((chatItem) => {
            const { is_group_chat, chat_users, chat_name, chat_messages } = chatItem;
            const contact = chat_users.find((user) => user._id !== currentUserId);
            const chatImg = is_group_chat ? "/assets/imgs/svg/users.svg" : contact!.user_profile_img_id ?? "/assets/imgs/svg/user.svg";
            const chatTitle = is_group_chat ? chat_name : contact!.username;

            const chatLastMessage = chat_messages![0];
            const chatLastMessageBody = chatLastMessage?.body;
            const chatLastMessageCreatedAt = chatLastMessage ? getChatFormatedDate(chatLastMessage.created_at!) : "";

            const chatLastMessageNotFromUser = chatLastMessage?.user_id !== currentUserId;
            const chatLastMessageIsUnreadByUser = !chatLastMessage?.message_seen_by?.find((item) => item.user_id === currentUserId);
            const showUnreadIcon = chatLastMessageNotFromUser && chatLastMessageIsUnreadByUser;
            const handleChatSelection = () => {
                setSelectedChat(chatItem);
            };

            return (
                <li key={chatItem._id}>
                    <NavLink className={({ isActive }) => `flex items-center min-h-[4.5rem] menu-item relative  ${getDynamicChatItemStlyes(isActive, showUnreadIcon)}`} to={`/k/${chatItem._id}`} onClick={handleChatSelection}>
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
