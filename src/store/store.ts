import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createChatsSlice, ChatsSlice } from "./slices/chatsSlice";
import { createMessagesSlice, MessagesSlice } from "./slices/messagesSlice";

type StoreState = ChatsSlice & MessagesSlice;
export const useStore = create<StoreState>()(
    devtools(
        persist(
            (set, get) => ({
                ...createChatsSlice(set),
                ...createMessagesSlice(set)
            }),
            { name: "whisper-global-storage" }
        )
    )
);
