"use client";
import { useRouter } from "next/navigation";
import { ProductCategory } from "@/lib/interface";
import { Button } from "../ui/button";
import Image from "next/image";
export default function Card({ data }: { data: ProductCategory }) {
  const router = useRouter();
  console.log(JSON.stringify(data, null, 2))
  return (
    <div
      onClick={() => router.push(`/product/${data.id}?c=${data.Product_category.category_name}`)}
      className="group flex max-w-fit animate-cart-animation cursor-pointer flex-col justify-end gap-3 overflow-hidden rounded-lg border text-center text-[14px] transition-colors  hover:border hover:border-blue-500 md:text-start md:text-[18px]"
    >
      <div className="relative flex justify-center">
        <Image
          className="self-center rounded-2xl p-2 transition-transform group-hover:rotate-2 group-hover:scale-95"
          src={data.product_image}
          alt="Product"
          width={300}
          height={300}
        />
        
      </div>
      <div className="flex flex-col border-t px-3 pt-3 group-hover:border-t-blue-500 ">
        <h1 className="font-bold">
          {data.name} 
        </h1>
      </div>
      <div className="flex justify-end p-3 ">
        <Button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-full"
        >
          <p className="text-[18px] font-bold">{data.product_item[0].price}Р</p>
        </Button>
      </div>
    </div>
  );
}
