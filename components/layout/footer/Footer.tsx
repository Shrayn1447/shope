import Link from "next/link";
export default function Footer() {
  return (
    <footer className="mt-[20px] px-[20px]">
      <div className="mx-auto flex max-w-[1140px] justify-between gap-x-8 border-t py-[40px]">
        <div>
          <ul className="flex flex-col gap-y-[8px] text-[14px] text-white/50">
            <li className="hover:underline">
              <Link href={"/"}>Главная</Link>
            </li>
            <li className="hover:underline">
              <Link href={"/footer/about"}>Обо мне</Link>
            </li>
            <li className="hover:underline">
              <Link href={"/footer/terms"}>Условия</Link>
            </li>
            <li className="hover:underline">
              <Link href={"/footer/shiping"}>Политика доставки</Link>
            </li>
            <li className="hover:underline">
              <Link href={"/footer/privacy"}>Политика конфиденциальности</Link>
            </li>
            <li className="hover:underline">
              <Link href={"/footer/faq"}>Часто задаваемые вопросы</Link>
            </li>
          </ul>
        </div>
        <div>
          <Link href={"/"}>
            <h1 className=" text-[20px] font-bold">NextSale</h1>
          </Link>
        </div>
      </div>
    </footer>
  );
}
