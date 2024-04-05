"use client";
import { useRouter } from "next/navigation";
import { IProduct } from "@/lib/interface";
import { Button } from "../ui/button";
import { usePersonStore } from "@/store/store";
import Image from "next/image";
import { Heart, Filter } from "lucide-react";
export default function Card({ data }: { data: IProduct }) {
  const router = useRouter();
  const like = usePersonStore((state) => state.like);
  const updateLike = usePersonStore((state) => state.updateLike);
  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className="group flex min-w-[200px] animate-cart-animation cursor-pointer flex-col justify-end gap-3 overflow-hidden rounded-lg border text-center text-[14px] transition-colors  hover:border hover:border-blue-500 md:text-start md:text-[18px]"
    >
      <div className="relative flex justify-center">
        <Image
          className="self-center rounded-2xl p-2 transition-transform group-hover:rotate-2 group-hover:scale-95"
          src={data.image_url}
          alt="Product"
          width={300}
          height={300}
        />
        <div
          onClick={(e) => {
            e.stopPropagation();
            updateLike(!like);
          }}
          className=" absolute right-3 top-4"
        >
          {like ? <Heart color="red" /> : <Heart />}
        </div>
      </div>
      <div className="flex flex-col border-t px-3 pt-3 group-hover:border-t-blue-500 ">
        <h1 className="font-bold">
          {data.name} {data.brand}
        </h1>
      </div>
      <div className="flex justify-end p-3 ">
        <Button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-full"
        >
          {" "}
          <p className="text-[18px] font-bold">{data.price}р</p>
        </Button>
      </div>
    </div>
  );
}
