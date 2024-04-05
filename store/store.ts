import { create } from "zustand";

type State = {
  like: boolean;
};

type Action = {
  updateLike: (like: State["like"]) => void;
};

export const usePersonStore = create<State & Action>((set) => ({
  like: false,
  updateLike: (like) => set(() => ({ like: like })),
}));
