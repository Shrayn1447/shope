"use client";
import { Button } from "../ui/button";
import { Variation, Product } from "@/lib/interface";
import { useState } from "react";
import { useBacketStore } from "@/store/backet";
import { useStateBacket } from "@/store/backetChange";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'
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
  const { backet, addCount, calculatePrice, updateBacket } = useBacketStore(
    (state) => state,
  );
  const opneChange = useStateBacket((state) => state.opneChange);
  const pathname = usePathname()
  const router = useRouter()
  const [form, setForm] = useState<Form>(() =>
    variation.variation.reduce((acc, item) => {
      return {
        ...acc,
        [item.name]: "",
      };
    }, {}),
  );

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
                      router.push(pathname+`?c=${data.product_category.category_name}&${item_new.name}=${item.value}`)
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

          const element = backet.find((item) => {
            return item.id === data.id;
          });
          if (element) {
            addCount(element);
            calculatePrice();
            opneChange();
            return null;
          }
          updateBacket({
            id: data.id,
            name: data.name,
            price: data.product_item[0].price,
            size: form.size || form.sneakers_size,
            color: form.color,
            img: data.product_image,
            count: 1,
          });
          calculatePrice();
          opneChange();
        }}
        type="submit"
        className=" rounded-xl"
      >
        Добавить в корзину +
      </Button>
    </form>
  );
}
