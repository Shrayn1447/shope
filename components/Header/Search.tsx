"use client";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import ListSearch from '@/components/Header/ListSearch'
import { useState } from "react";

export default function SearchForm() {

const [query, setQuery] = useState<string>()
  return (
    <>
      <form  className="w-max-[550px] relative flex w-full justify-end lg:w-80 xl:w-full">
        <Input
          className="mx-4 h-[30px] w-[80%] min-w-[200px] max-w-[550px] text-[14px] placeholder:text-gray-300"
          type="text"
          placeholder="Поиск товаров..."
          onChange={(e) => {
            setQuery(e.target.value)
          }}
        />
        <Search
          size={20}
          className="absolute animate-cart-animation right-0 top-0 mr-6 flex h-full items-center text-white/60"
        />
        {query ? <ListSearch query={query!}/> : null}
      </form>
    </>
  );
}
