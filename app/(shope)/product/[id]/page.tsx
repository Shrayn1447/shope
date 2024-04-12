
import React from "react";
import axios from "axios";
import { Product, Variation } from "@/lib/interface";
import ImageList from "@/components/cart_item/ImageList";
import FormProduct from "@/components/cart_item/FormProduct";
export default async function page({ params,searchParams}: { params: { id: string },  searchParams: { [c: string]: string | string[] | undefined } }) {
  const response = await axios.get(`${process.env.NEXTAUTH_URL}/api/product/${params.id}?c=${searchParams.c}`);
  const { data,variation }: { data: Product, variation:Variation} = response.data;
  console.log(data)
  return (
    <div className="mx-auto min-h-screen max-w-[1440px] px-[20px]">
      <article className=" flex max-w-full mt-[20px] animate-cart-animation   flex-col justify-center gap-3 rounded-xl border p-8 lg:flex-row ">
        <div className="flex gap-3 flex-col h-full w-full basis-full items-center justify-center">
         <ImageList data={data} />
        </div>
        <div className="flex h-full  gap-4 flex-col w-full basis-full justify-center">
          <div className="flex w-full flex-col gap-2 border-b pb-[20px]">
            <h1 className="text-5xl font-medium">{data.name}</h1>   
          </div>
          <FormProduct variation={variation} />
        </div>
      </article>
    </div>
  );
}
