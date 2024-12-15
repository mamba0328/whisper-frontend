import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createChatsSlice, ChatsSlice } from "./slices/chatsSlice";
import { createMessagesSlice, MessagesSlice } from "./slices/messagesSlice";
import { createActionPopupSlice, ActionPopupSlice } from "./slices/actionPopupSlice";

type StoreState = ChatsSlice & MessagesSlice & ActionPopupSlice;
export const useStore = create<StoreState>()(
    devtools(
        persist(
            (set, get) => ({
                ...createChatsSlice(set),
                ...createMessagesSlice(set),
                ...createActionPopupSlice(set)
            }),
            { name: "whisper-global-storage" }
        )
    )
);
