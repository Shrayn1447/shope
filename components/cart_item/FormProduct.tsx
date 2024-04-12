'use client'
import { Button} from "../ui/button"
import { Variation } from "@/lib/interface"
import { useState } from "react"
import { useBacketStore } from "@/store/store"
import clsx from "clsx"
interface Form {
  color:string | null,
  size:string | null
}
export default function FormProduct({variation} : {variation: Variation}) {
  const updateBacket = useBacketStore((state) => state.updateBacket)
  const [form, setForm] = useState<Form>({color:null, size:null})
  console.log(form.size)
  return (
   <form className="flex flex-col gap-3">
            {variation.variation.map((item_new) => {
              return (
                <dl key={item_new.id} className="flex flex-col gap-3">
                  <dt>{item_new.name.toUpperCase()}</dt>
                  <dd className="flex gap-2">
                      {item_new.variation_option.map((item) => {
                        return (
                          <button onClick={(e) => {
                            e.preventDefault()
                            setForm({
                              ...form,
                              [item_new.name]:item.value
                            })
                           }}  key={item.value} className={clsx("border-2 hover:border-blue-500 hover:scale-105 transition-all p-1 px-3 rounded-xl", {
                            "border-blue-500": form.color === item.value || form.size === item.value,
                             
                           })}>
                              {item.value}
                          </button>
                        )
                      })}
                  </dd>
                </dl>
              )
            })}
            <p>Описание</p>
            <Button onClick={(e) => { 
              e.preventDefault()
              if(form.color && form.size) {
                // updateBacket({
                //   id:Number(new Date()),
                //   name:data.name,
                //   price:price,
                //   size:size,
                //   color:color,
                //   img:product.img[0].url
                // }) 
              }
              return null
              }}  type="submit" className=" rounded-xl">Добавить в корзину +</Button>
          </form> 
  )
}

