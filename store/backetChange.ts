import { create } from "zustand";

type State = {
  open: boolean;
  opneChange: () => void;
};

export const useStateBacket = create<State>((set) => ({
  open: false,
  opneChange: () =>
    set((state) => {
      return { open: !state.open };
    }),
}));
