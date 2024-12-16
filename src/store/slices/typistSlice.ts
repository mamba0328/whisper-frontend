import { Typist } from "../../types/types";

export interface TypistSlice {
    typists: Array<Typist>;
    addTypist: (typist: Typist) => void;
    removeTypist: (typist: Typist) => void;
}

type Set = (
    partial: Partial<TypistSlice> | ((state: TypistSlice) => TypistSlice | Partial<TypistSlice>)
) => void;

export const createTypistSlice = (set: Set): TypistSlice => ({
    typists: [],
    addTypist: (typist) => set((state) => ({ typists: [...state.typists, typist] })),
    removeTypist: (typist) => set((state) => ({ typists: state.typists.filter(({ user_id, chat_id }) => user_id !== typist.user_id && chat_id !== typist.chat_id) }))
});


