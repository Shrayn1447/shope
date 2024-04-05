import React from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
export default function Basket() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded-md border p-2">
          {" "}
          <Menu size={25} />
        </button>
      </SheetTrigger>
      <SheetContent>
        <nav className="mt-[50px] flex h-screen text-[40px]">
          <ul className="flex w-full flex-col">
            <li>
              <Link href={"/"}>Домой</Link>
            </li>
            <li>
              <Link href={"/search/all"}>Все</Link>
            </li>
            <li>
              <Link href={"/search/shirt"}>Футболки</Link>
            </li>
            <li>
              <Link href={"/search/sneakers"}>Крассовки</Link>
            </li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
