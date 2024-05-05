"use client";
import Price from "./Price";
import BasketElement from "./BasketElement";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { useBacketStore } from "@/store/basket/backet";
import { ShoppingCart } from "lucide-react";
export default function Basket() {
  const backet = useBacketStore((state) => state.backet);
  return (
    <Sheet >
      <SheetTrigger asChild>
        <button className="relative rounded-md border p-2">
          {backet.length !== 0 ? (
            <div className=" absolute -right-2 -top-2 w-[15px] rounded-full bg-red-500 text-[10px]">
              {backet.length}
            </div>
          ) : null}
          <ShoppingCart className="h-[25px] w-[25px] md:h-[15px] md:w-[15px]" />
        </button>
      </SheetTrigger>
      <SheetContent data-state="open" className="pr-0">
        <SheetHeader>
          <SheetTitle className="text-center">Корзина</SheetTitle>
          <SheetDescription className="h-[80vh] min-w-full  overflow-auto">
            <ul className="text-white">
              {backet.length !== 0 ? (
                backet.map((item, index) => {
                  return (
                    <BasketElement key={item.id} item={item} index={index} />
                  );
                })
              ) : (
                <p className="pt-[100px] text-center text-3xl">Корзина пуста</p>
              )}
            </ul>
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Price />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
