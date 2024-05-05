"use client";
import { Button } from "../../ui/button";
import { Variation, Product } from "@/lib/interface/interface";
import { MouseEvent, useCallback,useState } from "react";
import { useBacketStore } from "@/store/basket/backet";
import { useRouter} from "next/navigation";
import { usePathname } from 'next/navigation'
import { Form } from "@/lib/interface/interface";
import clsx from "clsx";
export default function Parametr({
  data,
  variation,
  children
}: {
  data: Product;
  variation: Variation;
  children:React.ReactNode
}) {
  const { backet, addCount, calculatePrice, addBacketItem } = useBacketStore(
    (state) => state,
  );
  const pathname = usePathname()
  const router = useRouter()
  const [form, setForm] = useState<Form>(() =>
    variation.variation.reduce((acc, item) => {
      return {
        ...acc,
        [item.name]: '',
      };
    }, {}),
  );
  const addProduct = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const element = backet.find((item) => {
      return item.id === data.id;
    });
    if (element) {
      addCount(element);
      calculatePrice();
      return null;
    }
    addBacketItem({
      id: data.id,
      name: data.name,
      price: data.product_item[0].price,
      size: form.size || form.sneakers_size,
      color: form.color,
      img: data.product_image,
      count: 1,
    });
    calculatePrice();
  }, [])

  const addParams = (e : MouseEvent<HTMLButtonElement>, key: string , value:string) => {
      e.preventDefault();
      setForm((state) => {
      return {
          ...state,
          [key]: value,
        }
      });
      router.push(pathname+`?c=${data.product_category.category_name}&color=black&size=${form['size']}`)
  }
  return (
    <>
    <form  className="flex flex-col gap-3">
    {variation.variation.map((item_new) => {
        return (
          <dl key={item_new.id} className="flex flex-col gap-3">
            <dt>{item_new.name.toUpperCase()}</dt>
            <dd className="flex gap-2" >
              {item_new.variation_option.map((item) => {
                return (
                  <button
                      value={item.value}
                      type="submit"
                      onClick={(e) => {
                      addParams(e, item_new.name, item.value)
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
    </form>
      <Button
        onClick={addProduct}
        type="submit"
        className="rounded-xl"
      >
        Добавить в корзину +
      </Button>
  </>
  );
}