"use client";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";
import { LogIn, LogOut } from "lucide-react";
import Basket from "../Backet";
import Link from "next/link";
export default function UserNavigation({ session }: { session: Session }) {
  return (
    <div className="flex flex-1 justify-end gap-4 md:w-1/3  md:justify-end md:px-[20px]">
      {session ? (
        <>
          <Basket />
          <button
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
            className="rounded-md border p-2"
          >
            <LogOut className="h-[25px] w-[25px] md:h-[15px] md:w-[15px]" />
          </button>
        </>
      ) : (
        <Link href={"/sign-in"} className="rounded-md border p-2">
          <LogIn
            className="h-[25px] w-[25px] md:h-[15px] md:w-[15px]"
            size={25}
          />
        </Link>
      )}
    </div>
  );
}
