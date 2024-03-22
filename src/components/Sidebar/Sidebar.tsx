import React from "react";
import { NavLink } from "react-router-dom";

import { getFormatedDate } from "../../utils/helpers";

import { SearchInput } from "../SearchInput/SearchInput";
import { Chat } from "../../types/types";


type Props = {
    chats: Array<Chat>,
}
export const Sidebar = ({ chats, ...props }:Props) => {

    const renderChatItem = (chats:Array<Chat>) => {
        if (!chats.length) {
            return;
        }

        return chats.map((chatItem) => {
            const { is_group_chat, chat_users, chat_name, chat_messages } = chatItem;
            const chatImg = is_group_chat ? "/assets/imgs/svg/users.svg" : chat_users[0]!.user_profile_img_id;
            const chatTitle = is_group_chat ? chat_name : chat_users[0]!.username;
            const chatLastMessageBody = chat_messages![0]?.body;
            const chatLastMessageCreatedAt = getFormatedDate(chat_messages![0]!.created_at!);
            const handleImgError = ({ currentTarget }:React.SyntheticEvent<HTMLImageElement>) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/assets/imgs/svg/user.svg";
            };

            return (
                <li key={chatItem._id}>
                    <NavLink className={"flex items-center min-h-[4.5rem] py-[0.5rem] px-[5px] rounded-lg cursor-pointer hover:bg-light-filled-secondary-text-color relative"} to={`/k/${chatItem._id}`} >
                        <div className={"w-[4rem] grid content-center"}>
                            <div className={"rounded-full bg-input-search-background-color size-[3.375rem]"}>
                                <img src={chatImg} alt={"user avatar"} onError={handleImgError}/>
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
        <aside className={"bg-surface-color w-full max-w-full sm:min-w-[450px] sm:max-w-[450px] min-h-[100vh] "}>
            <div className={"border-b-[1px] border-b-border-color p-1"}>
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
