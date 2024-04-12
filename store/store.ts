import { create } from "zustand";

export interface Backet {
 id: number,
 name: string,
 price: number,
 size: string,
 color: string,
 img: string
}

type State = {
 backet: Backet[],
 updateBacket: (item: Backet) => void;
 deleteBacket: (index: number) => void; // Исправлено название метода
};

export const useBacketStore = create<State>((set) => ({
 backet: [], 
 deleteBacket: (index) => set((state) => {
    const newBacket = [...state.backet]; 
    newBacket.splice(index, 1); 
    return { backet: newBacket };
 }),
 updateBacket: (item) => set((state) => ({ backet: [...state.backet, item] })), // Добавляем новый элемент в конец массива
}));
