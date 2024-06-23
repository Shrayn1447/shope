"use client";

import Image from "next/image";
import { useState} from "react";
import clsx from "clsx";
import {  IProduct } from "@/lib/interface/interface";

export default function ImageList({ data }: { data:  IProduct }) {
  const [currentImg, setCurrentImg] = useState<string>(data.product_image);
  return (
    <div className="flex h-full w-full basis-full flex-col items-center justify-center gap-3">
      <Image
        width={400}
        height={400}
        src={currentImg!}
        alt={"Product"}
        className="h-full rounded-xl"
      />
      <ul className="flex justify-center gap-3">
        {data?.product_item.length < 2
          ? null
          : data?.product_item?.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => {
                    setCurrentImg(item.product_img);
                  }}
                  className="cursor-pointer"
                >
                  <Image
                    src={item.product_img}
                    alt="Image"
                    width={100}
                    height={100}
                    className={clsx("0 h-[80px] w-auto rounded-lg border-2", {
                      "border-blue-500": item.product_img === currentImg,
                    })}
                  />
                </li>
              );
            })}
      </ul>
    </div>
  );
}
