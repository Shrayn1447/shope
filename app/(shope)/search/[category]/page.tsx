import React from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { ProductCategory } from "@/lib/interface/interface";
import { category } from "@prisma/client";
const ProductCart = dynamic(() => import("@/components/sdas/ProductCart"));
export default async function page({
  params,
}: {
  params: { category: string };
}) {
  const response = await axios.get(
    `http://localhost:3000/api/product/${params.category}`,
  );
  const { data }: { data: ProductCategory[] } = response.data;
  return (
    <div className="grid grid-cols-2 gap-x-2 md:grid-cols-4">
      {data?.map((item, index) => {
        return <ProductCart category={params.category} key={index} data={item} />;
      })}
    </div>
  );
}
