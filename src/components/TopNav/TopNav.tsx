import React from "react";

import { handleProfileImgError } from "../../utils/helpers";

import { User } from "../../types/types";

type Props = {
    contact: User | undefined,
}
export const TopNav = ({ contact }:Props) => {
    return (
        <header className={"w-full min-w-[210px] bg-surface-color min-h-[56px] max-h-[56px]  flex items-center px-[1rem]"}>
            <nav className={"w-full"}>
                <ul className={"flex justify-start"}>
                    <li className={"flex gap-[1rem]"}>
                        <div className={"grid content-center rounded-full bg-input-search-background-color size-[42px]"}>
                            <img src={contact?.user_profile_img_id} alt={"user avatar"} onError={handleProfileImgError}/>
                        </div>
                        <div>
                            <h4 className={"text-primary-text-color font-medium text-sm"}>{contact?.username}</h4>
                            <p className={"text-secondary-text-color text-sm"}>last seen recently</p>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
