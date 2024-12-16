import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createChatsSlice, ChatsSlice } from "./slices/chatsSlice";
import { createMessagesSlice, MessagesSlice } from "./slices/messagesSlice";
import { createActionPopupSlice, ActionPopupSlice } from "./slices/actionPopupSlice";
import { createTypistSlice, TypistSlice } from "./slices/typistSlice";

type StoreState = ChatsSlice & MessagesSlice & ActionPopupSlice & TypistSlice;
export const useGlobalStore = create<StoreState>()(
    devtools(
        persist(
            (set, get) => ({
                ...createChatsSlice(set),
                ...createMessagesSlice(set),
                ...createActionPopupSlice(set),
                ...createTypistSlice(set)
            }),
            { name: "whisper-global-storage" }
        )
    )
);
