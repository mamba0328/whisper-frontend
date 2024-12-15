import { Message } from "../../types/types";

export interface MessagesSlice {
    chatMessages: Array<Message>;
    setChatMessages: (chatMessages: MessagesSlice["chatMessages"]) => void;
}

export const createMessagesSlice = (set: (partial: Partial<MessagesSlice>) => void): MessagesSlice => ({
    chatMessages: [],
    setChatMessages: (chatMessages) => set({ chatMessages })
});
