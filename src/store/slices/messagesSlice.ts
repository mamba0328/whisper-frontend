import { Message } from "../../types/types";

export interface MessagesSlice {
    chatMessages: Array<Message>;
    setChatMessages: (chatMessages: MessagesSlice["chatMessages"]) => void;
    deleteMessage: (messageId: string) => void;
    updateMessage: (updatedMessage:Message) => void;
}

type Set = (
    partial: Partial<MessagesSlice> | ((state: MessagesSlice) => MessagesSlice | Partial<MessagesSlice>)
) => void;

export const createMessagesSlice = (set:Set): MessagesSlice => ({
    chatMessages: [],
    setChatMessages: (chatMessages) => set({ chatMessages }),
    deleteMessage: (messageId) => set((state) => ({ chatMessages: state.chatMessages.filter((message) => message._id !== messageId) })),
    updateMessage: (updatedMessage) => set((state) => ({ chatMessages: state.chatMessages.map((message) => message._id === updatedMessage._id ? updatedMessage : message) }))
});
