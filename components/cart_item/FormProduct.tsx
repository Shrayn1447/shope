"use client";
import { Button } from "../ui/button";
import { Variation, Product } from "@/lib/interface";
import { useEffect, useState } from "react";
import { useBacketStore } from "@/store/backet";
import clsx from "clsx";
import axios from "axios";
interface Form {
  [key: string]: string;
}
export default function FormProduct({
  data,
  variation,
}: {
  data: Product;
  variation: Variation;
}) {
  const updateBacket = useBacketStore((state) => state.updateBacket);
  const [form, setForm] = useState<Form>(() =>
    variation.variation.reduce((acc, item) => {
      return {
        ...acc,
        [item.name]: "",
      };
    }, {}),
  );
  // const [filter, setFilter] = useState()
  // useEffect(() => {
  //   async function  getFilter() {
  //     const data = axios.get("")
  //   }
  //   getFilter()
  // }, [form])
  return (
    <form className="flex flex-col gap-3">
      {variation.variation.map((item_new) => {
        return (
          <dl key={item_new.id} className="flex flex-col gap-3">
            <dt>{item_new.name.toUpperCase()}</dt>
            <dd className="flex gap-2">
              {item_new.variation_option.map((item) => {
                return (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setForm({
                        ...form,
                        [item_new.name]: item.value,
                      });
                    }}
                    key={item.value}
                    className={clsx(
                      "rounded-xl border-2 p-1 px-3 transition-all hover:scale-105 hover:border-blue-500",
                      {
                        "border-blue-500": item.value === form[item_new.name],
                      },
                    )}
                  >
                    {item.value}
                  </button>
                );
              })}
            </dd>
          </dl>
        );
      })}
      <Button
        onClick={(e) => {
          e.preventDefault();
          // if(form.color && form.size) {
          //   updateBacket({
          //     id:Number(new Date()),
          //     name:data.name,
          //     price:,
          //     size:size,
          //     color:color,
          //     img:variation
          //   })
          // }
          return null;
        }}
        type="submit"
        className=" rounded-xl"
      >
        Добавить в корзину +
      </Button>
    </form>
  );
}
