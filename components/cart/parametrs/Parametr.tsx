"use client";
import { Button } from "../../ui/button";
import { MouseEvent, useCallback, useMemo, useState } from "react";
import { useBacketStore } from "@/store/basket/backet";
import { useOptionStore } from "@/store/parametrs/parametrs";
import {
  IParams,
  IVariationProduct,
  IVariation,
  IProduct,
} from "@/lib/interface/interface";
import clsx from "clsx";
interface IParametrsType {
  variants: IVariationProduct[];
}

export default function Parametrs({
  data,
  variation,
}: {
  data: IProduct;
  variation: IVariation;
}) {
  const { backet, addCount, calculatePrice, addBacketItem } = useBacketStore(
    (state) => state,
  );

  const {options} = useOptionStore((state) => state)
  const addProduct = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    addBacketItem({
      id: data.id,
      name: data.name,
      price: data.product_item[0].price,
      options:options,
      img: data.product_image,
      count: 1,
    });
  }, []);
  const variants = useMemo(() => variation.variation, []);
  return (
    <>
      <ParametrsCategory variants={variants} />
      <Button onClick={addProduct} type="submit" className="rounded-xl">
        Добавить в корзину +
      </Button>
    </>
  );
}

function ParametrsCategory({ variants }: IParametrsType) {
  return (
    <section>
      {variants.map((type) => {
        return (
          <dl key={type.id} className="flex flex-col gap-3">
            <dt className="uppercase">{type.name}</dt>
            <ParametrsItem type={type} />
          </dl>
        );
      })}
    </section>
  );
}

function ParametrsItem({ type }: { type: IVariationProduct }) {
  const {options, setOption} = useOptionStore((state) => state)
  return (
    <dd className="flex gap-2">
      {type.variation_option.map((item) => {
        return (
          <button
            onClick={() => {
              setOption(type.name, item.value)
            }}
            key={item.value}
            className={clsx(
              "rounded-xl border-2 p-1 px-3 transition-all hover:scale-105 hover:border-blue-500",
              {
                "border-blue-500": item.value === options[type.name]
              },
            )}
          >
            {item.value}
          </button>
        );
      })}
    </dd>
  );
}
