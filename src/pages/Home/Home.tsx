import React from "react";
import { useParams } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { ChatWindow } from "../../components/ChatWindow/ChatWindow";

export const Home = () => {
    const { chatId } = useParams();

    return (
        <div className={"flex"}>
            <Sidebar/>
            <ChatWindow chatId={chatId}/>
        </div>
    );
};

