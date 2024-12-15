import { Chat, Message } from "../../types/types";

export interface ChatsSlice {
    allChats: Array<Chat>;
    setAllChats: (allChats: ChatsSlice["allChats"]) => void;
    updateChatsPreviewMessage: (newMessage: Message) => void;
}

type Set = (
    partial: Partial<ChatsSlice> | ((state: ChatsSlice) => ChatsSlice | Partial<ChatsSlice>)
) => void;

const updateChatsPreviewMessageCurry = (set:Set) => (newMessage:Message) => {
    set((state) => {
        const allChats = state.allChats;
        const indexOfChatWithUpdatedMessage = allChats.findIndex((chat) => newMessage.chat_id === chat._id);
        const chatsClone = [...allChats];

        if (!chatsClone[indexOfChatWithUpdatedMessage]) {
            return { allChats };
        }

        chatsClone[indexOfChatWithUpdatedMessage].chat_messages = [newMessage];

        return { allChats: chatsClone };
    });
};

export const createChatsSlice = (set: Set): ChatsSlice => ({
    allChats: [],

    setAllChats: (allChats) => set({ allChats }),

    updateChatsPreviewMessage: updateChatsPreviewMessageCurry(set)
});
