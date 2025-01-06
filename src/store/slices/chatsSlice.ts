import { Chat, Message } from "../../types/types";

export interface ChatsSlice {
    allChats: Array<Chat>;
    setAllChats: (allChats: ChatsSlice["allChats"]) => void;
    updateChatsPreviewMessage: (newMessage: Message) => void;
}

type Set = (
    partial: Partial<ChatsSlice> | ((state: ChatsSlice) => ChatsSlice | Partial<ChatsSlice>)
) => void;

export const createChatsSlice = (set: Set): ChatsSlice => ({
    allChats: [],
    setAllChats: (allChats) => set({ allChats }),
    updateChatsPreviewMessage: updateChatsPreviewMessageCurry(set)
});

const updateChatsPreviewMessageCurry = (set:Set) => (newMessage:Message) => {
    set((state) => {
        const { allChats } = state;
        const indexOfChatWithUpdatedMessage = allChats.findIndex((chat) => newMessage.chat_id === chat._id);

        if (indexOfChatWithUpdatedMessage === -1) {
            return { allChats };
        }

        let updatedChats = allChats.map((chat, index) => {
            if (index === indexOfChatWithUpdatedMessage) {
                return { ...chat, chat_messages: [newMessage] };
            }
            return chat;
        });

        if (updatedChats.length > 1) {
            updatedChats = updatedChats.sort((a, b) => new Date(b.chat_messages![0]!.created_at!).getTime() - new Date(a.chat_messages![0]!.created_at!).getTime());
        }

        return { allChats: updatedChats };
    });
};
