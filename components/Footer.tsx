import Link from "next/link";
export default function Footer() {
  return (
    <footer className="mt-[20px] px-[20px]">
      <div className="mx-auto max-w-[1440px] border-t py-[40px] ">
        <div>
          <Link href={"/"}>
            <h1 className=" text-[20px] font-bold">NextSale</h1>
          </Link>
        </div>
        <div>
          <ul>
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>About</li>
            <li>Home</li>
            <li>Home</li>
          </ul>
        </div>
        <div></div>
      </div>
    </footer>
  );
}
