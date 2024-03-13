import React from "react";
import { SearchInput } from "../SearchInput/SearchInput";

export const Sidebar = () => {
    return (
        <aside className={"bg-surface-color w-full max-w-full sm:max-w-[450px] min-h-[100vh] "}>
            <div className={"border-b-[1px] border-b-border-color p-1"}>
                <SearchInput/>
            </div>
            <nav className={"p-1"}>

            </nav>
        </aside>
    );
};
