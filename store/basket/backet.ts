import { create } from "zustand";

export interface IBacket {
  id: number;
  name: string;
  price:number;
  options:{
    [key:string] : string
  }
  img: string;
  count: number;
}

type State = {
  backet: IBacket[];
  price: number;
  open:boolean;
  changeBacket: () => void;
  addBacketItem: (item: IBacket) => void;
  deleteBacket: (id: number) => void;
  addCount: (item: IBacket) => void;
  calculatePrice: () => void;
};

// const element = backet.find((item) => item.id === data.id);
// if (element) {
//   addCount(element);
//   calculatePrice();
//   return null;
// }
export const useBacketStore = create<State>((set) => ({
  price: 0,
  backet: [],
  open:false,
  deleteBacket: (id) =>
    set((state) => {
      const newBacket = [...state.backet];
      const basket = newBacket.filter((item) => item.id !== id);
      return { backet: basket };
    }),
    
  addBacketItem: (item) =>
    set((state) => {
        const id = state.backet.findIndex((product) => product.id === item.id)
        state.changeBacket()
        if(id >= 0) {
          state.addCount(item)
          state.calculatePrice();
          return ({ backet: [...state.backet] })
        } else {
          state.calculatePrice();
          return ({ backet: [...state.backet, item] })
        }
    }),
  changeBacket: () => set((state) => ({ open: !state.open }) ),
  addCount: (item) =>
    set((state) => {
      const find = state.backet.findIndex((element) => {
        return element.id === item.id;
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
