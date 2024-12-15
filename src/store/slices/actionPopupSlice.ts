import { Message } from "../../types/types";
import React from "react";

type Position = { top: string, left: string }
export interface ActionPopupSlice {
    actionPopupPosition: Position | undefined,
    messageAtAction: Message | null,

    closeActionPopup: () => void;
    openActionPopup: (e:React.MouseEvent, message: Message) => void;
    resetActionPopup: () => void;
}

const initialState = {
    actionPopupPosition: undefined,
    messageAtAction: null
};

type Set = (
    partial: Partial<ActionPopupSlice> | ((state: ActionPopupSlice) => ActionPopupSlice)
) => void;

export const createActionPopupSlice = (set:Set): ActionPopupSlice => ({
    ...initialState,
    openActionPopup: (e:React.MouseEvent, message: Message) => set({ messageAtAction: message, actionPopupPosition: { top: `${e.clientY}px`, left: `${e.clientX}px` } }),
    closeActionPopup: () => set({ actionPopupPosition: undefined }),
    resetActionPopup: () => set(initialState)
});
