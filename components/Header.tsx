"use client";
import React from "react";
import Link from "next/link";
import { ShoppingCart, LogIn, LogOut } from "lucide-react";

import { useSession, signOut } from "next-auth/react";
import { Input } from "./ui/input";
export default function Header() {
  const session = useSession();
  return (
    <header className="sticky top-0 w-full bg-white">
      <div className=" mx-auto flex max-w-[1440px] items-center  p-[20px]">
        <div className="flex items-center  gap-3">
          <Link href={"/"}>
            <h1 className=" text-[20px] font-bold">NextSale</h1>
          </Link>
          <nav>
            <ul className="hidden items-center gap-2 md:flex ">
              <li>
                <Link href={"/all"}>Все</Link>
              </li>
              <li>
                <Link href={"/shirts"}>Футболки</Link>
              </li>
              <li>
                <Link href={"/sneakers"}>Кроссовки</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Input
          className="mx-4 h-[35px] w-full text-lg placeholder:text-gray-300"
          type="text"
          placeholder="Поиск товаров..."
        />
        <div className="flex items-center justify-center gap-3">
          <button className="rounded-md border p-2">
            <ShoppingCart />
          </button>
          {session?.data ? (
            <button
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
              className="rounded-md border p-2"
            >
              <LogOut />
            </button>
          ) : (
            <Link href={"/sign-in"} className="rounded-md border p-2">
              <LogIn />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
