import React from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { ProductCategory } from "@/lib/interface";
const ProductCart = dynamic(() => import("@/components/Cart_item/ProductCart"));
export default async function page({
  params,
}: {
  params: { category: string };
}) {
  const response = await axios.get(
    `http://localhost:3000/api/product?type=${params.category.toUpperCase()}`,
  );
  const { data }: { data: ProductCategory[] } = response.data;

  return (
    <div className="grid grid-cols-2 gap-x-2 md:grid-cols-4">
      {data?.map((item, index) => {
        return <ProductCart key={index} data={item} />;
      })}
    </div>
  );
}
