import React from "react";
import { NavLink } from "react-router-dom";
import { SearchInput } from "../SearchInput/SearchInput";
import { Chat, Message } from "../../types/types";
import { mockChatRespone } from "./mockChats";

type ChatResponse = {
    chat:Chat,
    last_message:Message,
}
export const Sidebar = () => {

    const renderChatItem = (chats:Array<ChatResponse>) => {
        return chats.map((item) => {
            const { chat, last_message } = item;

            const chatImg = chat.is_group_chat ? "/assets/imgs/svg/users.svg" : chat.chat_users[0]!.user_profile_img_id;
            const chatTitle = chat.is_group_chat ? chat.chat_name : chat.chat_users[0]!.username;
            const chatLastMessageBody = last_message.body;
            const chatLastMessageCreatedAt = last_message.created_at;
            const handleImgError = ({ currentTarget }:React.SyntheticEvent<HTMLImageElement>) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/assets/imgs/svg/user.svg";
            };

            return (
                <li key={chat._id}>
                    <NavLink className={"flex items-center min-h-[4.5rem] py-[0.5rem] px-[5px] rounded-lg cursor-pointer hover:bg-light-filled-secondary-text-color"} to={`/k/${chat._id}`} >
                        <div className={"w-[4rem] grid content-center"}>
                            <div className={"rounded-full bg-input-search-background-color size-[3.375rem]"}>
                                <img src={chatImg} alt={"user avatar"} onError={handleImgError}/>
                            </div>
                        </div>
                        <div>
                            <h4 className={"text-primary-text-color font-medium"}>{chatTitle}</h4>
                            {/* <p>{chatLastMessageCreatedAt}</p> TODO: dateformatted pseudo*/}
                            <p className={"line-clamp-1 text-secondary-text-color pr-[5px]"}>{chatLastMessageBody}</p>
                        </div>
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
                    {renderChatItem(mockChatRespone)}
                </ul>
            </nav>
        </aside>
    );
};
