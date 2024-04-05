import React from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { IProduct } from "@/lib/interface";
const ProductCart = dynamic(() => import("@/components/cart_item/ProductCart"));
export default async function page({
  params,
}: {
  params: { category: string };
}) {
  const response = await axios.get(
    `http://localhost:3000/api/clothes?type=${params.category.toUpperCase()}`,
  );
  const { data } : { data: IProduct[] } = response.data;

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
      {data?.map((item, index) => {
        return <ProductCart key={index} data={item} />;
      })}
    </div>
  );
}
