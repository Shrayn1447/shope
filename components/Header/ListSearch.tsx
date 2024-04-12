"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "../Loading/Loading";
import debounce from "debounce";
interface Name {
  id: number;
  name: string;
  brand: string;
  gender: string;
}

export default function ListSearch({ query }: { query: string }) {
  const router = useRouter();
  const [data, setData] = useState<Name[]>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    async function getData(query: string) {
      try {
        const res = await fetch(
          `http://localhost:3000/api/query?query=${query}`,
        );
        const data = await res.json();
        setData(data.data);
      } catch (e) {
        console.error("Привет мир");
      } finally {
      }
    }
    const getDataDebounce = debounce(() => getData(query), 500);
    getDataDebounce();
  }, [query]);
  if (loading) {
    return (
      <div className=" absolute right-4 top-10 min-h-[100px] min-w-[80%]  rounded-md bg-white/90 p-2 text-lg font-bold text-black backdrop-blur-sm">
        <Loading size="50" />
      </div>
    );
  }
  return (
    <div className=" absolute right-4 top-10 min-h-[100px] min-w-[80%]  rounded-md bg-white/90 p-2 text-lg font-bold text-black backdrop-blur-sm">
      <ul>
        {data?.length === 0 ? (
          <p>Ничего не найдено</p>
        ) : (
          data?.map((item) => {
            return (
              <li key={item.id}>
                <p
                  className="cursor-pointer hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/search/query?q=${item.name}`);
                  }}
                >
                  {item.name}
                </p>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
