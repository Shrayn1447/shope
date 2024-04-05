import SearchForm from "./Search";
import Link from "next/link";
import UserNavigation from "@/components/Header/UserNavigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Burger from "@/components/Burger";
export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="sticky top-0 z-[10] flex h-[80px] flex-row-reverse items-center justify-between bg-card">
      <div className=" w-full items-center  px-[50px] md:flex">
        <div className="mr-[10px] hidden flex-1 items-center md:flex md:gap-6 lg:gap-8">
          <Link href={"/"}>
            <h1 className=" text-[20px] font-bold">NextSale</h1>
          </Link>
          <nav className="text-[14px] text-[#bdbdbd]">
            <ul className="flex w-full md:w-1/3 md:gap-2 lg:gap-6">
              <li>
                <Link className=" hover:underline" href={"/"}>
                  Все
                </Link>
              </li>
              <li>
                <Link className=" hover:underline" href={"/search/shirt"}>
                  Футболки
                </Link>
              </li>
              <li>
                <Link className=" hover:underline" href={"/search/sneakers"}>
                  Кроссовки
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="hidden w-full flex-1 md:flex md:w-1/3">
          <SearchForm />
        </div>
        <UserNavigation session={session!} />
      </div>
      <div className="flex w-full px-[20px] md:hidden">
        <Burger />
      </div>
    </header>
  );
}
