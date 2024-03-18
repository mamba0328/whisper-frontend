import React from "react";

type Props = {
    chatId: string | undefined,
}

export function ChatWindow ({ chatId } : Props) {

    return (
        <section className={"hidden sm:grid place-content-center bg-surface-color border border-b-dark-message-background-color w-full "}>
            <p className={"p-[0.5rem] px-[1rem] rounded-3xl bg-input-search-background-color text-secondary-text-color"}>
                {chatId || "Select open chat or contact to start messaging"}
            </p>
        </section>
    );
}

