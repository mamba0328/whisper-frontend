import { create } from "zustand";
import { combine, devtools, persist } from "zustand/middleware";
import { Chat, Message } from "../types/types";

interface State {
    allChats: Array<Chat>;
    chatMessages: Array<Message>;
}

interface Actions {
    setChatMessages: (chatMessages: State["chatMessages"]) => void;
    setAllChats: (allChats: State["allChats"]) => void;
}

type GlobalStore = State & Actions;

const initialState: State = {
    allChats: [],
    chatMessages: []
};

const actions = (set: (arg: Partial<State>) => void): Actions => ({
    setChatMessages: (chatMessages: Array<Message>) => set({ chatMessages }),
    setAllChats: (allChats: Array<Chat>) => set({ allChats })
});

export const useGlobalStore = create<GlobalStore>()(
    devtools(
        persist(
            combine<State, Actions>(initialState, (set) => actions(set)),
            { name: "whisper-global-storage" }
        )
    )
);


