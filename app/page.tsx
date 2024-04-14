'use client'
import axios from "axios"
import { ProductCategory } from "@/lib/interface"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"

export default function Home() {
  const {data, isLoading, error} = useQuery({
    queryKey:["query"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/home")
      const { data } : { data:ProductCategory[] } =  response.data
      return data
    }
  })
  return (
    <div className="flex gap-3 min-h-screen max-w-[1440px] mx-auto">
      {data?.map((item) => {
        return (
          <div className="group flex flex-col animate-cart-animation cursor-pointer max-h-[400px] max-w-[300px]  justify-end gap-3 overflow-hidden rounded-lg border text-center text-[14px] transition-colors  hover:border hover:border-blue-500 md:text-start md:text-[18px]">
          <div  className="relative  basis-full items-center flex justify-center">
            <Image
              className="self-center rounded-2xl p-2 transition-transform group-hover:rotate-2 group-hover:scale-95"
              src={item.product_image}
              alt="Product"
              width={300}
              height={300}
            />
          </div>
          <div className="flex flex-col border-t px-3 pt-3 group-hover:border-t-blue-500 ">
            <h1 className="font-bold">{item.name}</h1>
          </div>
          <div className="flex justify-end p-3 ">
            <Button className="w-full">
              <p className="text-[18px] font-bold">{""}Р</p>
            </Button>
          </div>
        </div>
        )
      })}
    </div>
  )
}
