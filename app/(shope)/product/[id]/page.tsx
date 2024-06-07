import axios from "axios";
import ImageList from "@/components/cart/ImageList";
import Parametrs from "@/components/cart/parametrs/Parametr";
import { IProduct, IVariation } from "@/lib/interface/interface";

export default async function page({ params }: { params: { id: string } }) {
  const response = await axios.get(
    `http://localhost:3000/api/product/category/${params.id}`,
  );
  const { data, variation }: { data: IProduct; variation: IVariation } =
    response.data;
  const price = data.product_item[0].price;
  return (
    <div className="mx-auto min-h-screen max-w-[1440px] px-[20px]">
      <article className=" mt-[20px] flex max-w-full animate-cart-animation flex-col items-center justify-center gap-3 rounded-xl border p-8 lg:flex-row ">
        <ImageList data={data} />
        <div className="flex h-full  w-full basis-full flex-col justify-center gap-4">
          <div className="flex w-full flex-col gap-2 border-b pb-[20px]">
            <h1 className="text-5xl font-medium">{data.name}</h1>
            <h4 className="w-fit rounded-sm bg-blue-500 p-1 text-[20px] font-medium">
              {price}Р
            </h4>
          </div>
          <Parametrs data={data} variation={variation} />
          <div className="max-h-[150px] overflow-y-auto p-4 text-[20px] font-medium">
            <p>{data.descreption}</p>
          </div>
        </div>
      </article>
    </div>
  );
}
