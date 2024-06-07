import Link from "next/link";
import { SearchForm, Navigation } from "@/components/index";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/auth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="sticky top-0 z-[10] mb-4 flex h-[80px] flex-row-reverse  items-center justify-between border-b bg-black/90 backdrop-blur-lg">
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
        <Navigation session={session!} />
      </div>
      <div className="flex w-full px-[20px] md:hidden">
        <Burger />
      </div>
    </header>
  );
}

function Burger() {
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
