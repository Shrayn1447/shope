import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
export default function Basket() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded-md border p-2">
          {" "}
          <ShoppingCart className="h-[25px] w-[25px] md:h-[15px] md:w-[15px]" />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-center">Корзина</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
