import { create } from "zustand";

export interface Backet {
  id: number;
  name: string;
  price: number;
  size: string;
  color: string;
  img: string;
  count: number;
}

type State = {
  backet: Backet[];
  price: number;
  updateBacket: (item: Backet) => void;
  deleteBacket: (index: number) => void;
  addCount: (item: Backet) => void;
  calculatePrice: () => void;
};

export const useBacketStore = create<State>((set) => ({
  price: 0,
  backet: [],
  deleteBacket: (index) =>
    set((state) => {
      const newBacket = [...state.backet];
      newBacket.splice(index, 1);
      return { backet: newBacket };
    }),
  updateBacket: (item) => set((state) => ({ backet: [...state.backet, item] })),
  addCount: (item) =>
    set((state) => {
      const find = state.backet.findIndex((element) => {
        return element.id === item.id && element.size === item.size;
      });
      ++state.backet[find].count;
      return { backet: [...state.backet] };
    }),
  calculatePrice: () =>
    set((state) => {
      const price = state.backet.reduce((acc, item) => {
        return (acc += item.price * item.count);
      }, 0);
      return { price: price };
    }),
}));
