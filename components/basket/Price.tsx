"use client";
import { useBacketStore } from "@/store/basket/backet";

export default function Price() {
  const price = useBacketStore((state) => state.price);
  return (
    <div className="mr-[20px] flex w-full border-t-2 items-center justify-between">

      <p className="my-4 text-[18px] font-medium">Сумма:{price}р</p>
    </div>
  );
}
