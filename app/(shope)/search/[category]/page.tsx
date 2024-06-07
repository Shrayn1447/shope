import React from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { IProductCategory } from "@/lib/interface/interface";
import NoProduct from "@/components/cart/NoProduct";
const ProductCart = dynamic(() => import("@/components/cart/ProductCart"));
export default async function page({
  params,
}: {
  params: { category: string };
}) {
  const response = await axios.get(
    `http://localhost:3000/api/product/${params.category}`,
  );
  const { data } : { data: IProductCategory[] } = response.data;
  const product = data
  return (
    <div className={`${product.length > 0 ? "grid grid-cols-2 gap-x-2 md:grid-cols-4" : "flex justify-center mt-[200px]"}`}>
      {product?.map((item, index) => {
        return (
          <>
            { product.length > 0 ? <ProductCart category={params.category} key={index} data={item} /> : <NoProduct/>}
          </>
        );
      })}
    </div>
  );
}
