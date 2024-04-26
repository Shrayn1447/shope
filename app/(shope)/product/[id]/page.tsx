import axios from "axios";
import ImageList from "@/components/Cart_item/ImageList";
import FormProduct from "@/components/Cart_item/FormProduct";
import { Product, Variation } from "@/lib/interface";

export default async function page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [c: string]: string | string[] | undefined };
}) {
  const response = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/product/${params.id}?c=${searchParams.c}`,
  );
  const { data, variation } : { data: Product; variation: Variation } = response.data;
  return (
    <div className="mx-auto min-h-screen max-w-[1440px] px-[20px]">
      <article className=" mt-[20px] flex max-w-full animate-cart-animation flex-col items-center justify-center gap-3 rounded-xl border p-8 lg:flex-row ">
        <div className="flex h-full w-full basis-full flex-col items-center justify-center gap-3">
          <ImageList data={data} />
        </div>
        <div className="flex h-full  w-full basis-full flex-col justify-center gap-4">
          <div className="flex w-full flex-col gap-2 border-b pb-[20px]">
            <h1 className="text-5xl font-medium">{data.name}</h1>
            <h4 className="w-fit rounded-sm bg-blue-500 p-1 text-[20px] font-medium">
              {data.product_item[0].price}Р
            </h4>
          </div>
          <FormProduct data={data} variation={variation} />
          <div className="max-h-[150px] overflow-y-auto p-4 text-[20px] font-medium">
            <p>{data.descreption} </p>
          </div>
        </div>
      </article>
    </div>
  );
}
