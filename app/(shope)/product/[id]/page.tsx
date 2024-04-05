import React from "react";
import axios from "axios";
import { IProduct } from "@/lib/interface";
export default async function page({ params }: { params: { id: string } }) {
  const response = await axios.get(
    `http://localhost:3000/api/clothes/${params.id}`,
  );
  const { data }: { data: IProduct } = response.data;

  return (
    <div className="mx-auto min-h-screen max-w-[1440px] px-[20px]">
      <div>{data.id}</div>
    </div>
  );
}
