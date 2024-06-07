import create from 'zustand';


type State = {
  options: { [key: string]: string };
  setOption: (key: string, value: string) => void;
};


export const useOptionStore = create<State>((set) => ({
  options: {},
  setOption: (key, value) =>
    set((state) => ({
      options: {
        ...state.options,
        [key]: value,
      },
    })),
}));
