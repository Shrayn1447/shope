import { ReactNode } from "react";

import SelectTypeСlothes from "@/components/Filter/SelectTypeСlothes";
export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="-z-10 mx-auto flex min-h-screen max-w-[1440px] px-[20px]">
      <aside className="hidden min-w-[250px] md:flex">
        <div className="sticky top-[100px] flex flex-col items-center gap-5 px-[20px] pt-[20px]">
          <SelectTypeСlothes />
        </div>
      </aside>
      <main className="w-full">{children}</main>
    </div>
  );
}
