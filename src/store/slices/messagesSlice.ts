import { Message } from "../../types/types";
import { getUsersChatMessages } from "../../services/UserRequestsService/UserRequestsService";

export interface MessagesSlice {
    chatMessages: Array<Message>;
    setChatMessages: (chatMessages: MessagesSlice["chatMessages"]) => void;
    addMessage: (message: Message) => void;
    deleteMessage: (messageId: string) => void;
    updateMessage: (updatedMessage:Message) => void;
    initChatMessages: (chatId: string) => Promise<void>;
}

type Set = (
    partial: Partial<MessagesSlice> | ((state: MessagesSlice) => MessagesSlice | Partial<MessagesSlice>)
) => void;

export const createMessagesSlice = (set:Set): MessagesSlice => ({
    chatMessages: [],
    setChatMessages: (chatMessages) => set({ chatMessages }),
    addMessage: (newMessage) => set((state) => ({ chatMessages: [newMessage, ...state.chatMessages] })),
    deleteMessage: (messageId) => set((state) => ({ chatMessages: state.chatMessages.filter((message) => message._id !== messageId) })),
    updateMessage: (updatedMessage) => set((state) => ({ chatMessages: state.chatMessages.map((message) => message._id === updatedMessage._id ? updatedMessage : message) })),

    initChatMessages: async (chatId) => {
        try {
            const chatMessages = await getUsersChatMessages({ chat_id: chatId });
            set({ chatMessages });
        } catch (error) {
            console.log(error);
        }
    }
});
