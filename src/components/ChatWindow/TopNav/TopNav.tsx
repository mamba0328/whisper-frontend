import React from "react";
import { handleProfileImgError } from "../../../utils/helpers";

import { User, Chat } from "../../../types/types";
import { useGlobalStore } from "../../../store/store";

type Props = {
    contact: User | undefined,
    chatId: Chat["_id"],
}
export const TopNav = ({ contact, chatId }:Props) => {
    const { typists } = useGlobalStore();

    const contactWritingInCurrentChat = !!typists.filter(({ user_id, chat_id }) => chat_id === chatId && contact?._id === user_id).length;

    return (
        <header className={"w-full min-w-[210px] bg-surface-color min-h-[56px] max-h-[56px]  flex items-center px-[1rem]"}>
            <nav className={"w-full"}>
                <ul className={"flex justify-start"}>
                    <li className={"flex gap-[1rem]"}>
                        <div className={"grid content-center rounded-full bg-input-search-background-color size-[42px]"}>
                            <img src={contact?.user_profile_img_id ?? "/assets/imgs/svg/user.svg"} alt={"user avatar"} onError={handleProfileImgError}/>
                        </div>
                        <div>
                            <h4 className={"text-primary-text-color font-medium text-sm"}>{contact?.username}</h4>
                            <p className={"text-secondary-text-color text-sm"}>
                                { contactWritingInCurrentChat ? "Writing..." : "last seen recently"}
                            </p>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
