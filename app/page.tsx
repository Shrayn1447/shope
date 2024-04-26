"use client";
import axios from "axios";
import Image from "next/image";
import Loading from "@/components/Loading/Loading";
import { ProductCategory } from "@/lib/interface";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["query"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/home");
      const { data }: { data: ProductCategory[] } = response.data;
      return data;
    },
  });
  if (error) {
    return <div>Error</div>
  }
  if (isLoading) {
    return (
      <div className="mx-auto min-h-screen max-w-[1200px] text-center">
        <Loading size="50" />
      </div>
    );
  }
  return (
    <div className="mx-auto grid min-h-screen max-w-[1200px] grid-cols-2 gap-2 md:grid-cols-4">
      {data?.map((item, index) => {
        return (
          <div
            key={item.id}
            onClick={() =>
              router.push(
                `/product/${item.id}?c=${item.product_category.category_name}`,
              )
            }
            className="group flex max-w-fit animate-cart-animation cursor-pointer flex-col justify-end gap-3 overflow-hidden rounded-lg border text-center text-[14px] transition-colors  hover:border hover:border-blue-500 md:text-start md:text-[18px]"
          >
            <div className="relative flex justify-center">
              <Image
                className="self-center rounded-2xl p-2 transition-transform group-hover:rotate-2 group-hover:scale-95"
                src={item.product_image}
                alt="Product"
                width={300}
                height={300}
              />
            </div>
            <div className="flex flex-col border-t px-3 pt-3 group-hover:border-t-blue-500 ">
              <h1 className="font-bold">{item.name}</h1>
            </div>
            <div className="flex justify-end p-3 ">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="w-full"
              >
                <p className="text-[18px] font-bold">
                  {item.product_item[0].price}Р
                </p>
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
