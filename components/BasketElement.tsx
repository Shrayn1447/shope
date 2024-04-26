"use client";
import { useState } from "react";
import { Backet } from "@/store/backet";
import { useBacketStore } from "@/store/backet";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
export default function BasketElement({
  item,
  index,
}: {
  item: Backet;
  index: number;
}) {
  const { calculatePrice, deleteBacket } = useBacketStore((state) => state);
  const [isVisible, setIsVisible] = useState(true);
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.li
          layout
          className=" flex gap-4 border-b py-4"
          exit={{ opacity: 0, y: -50 }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <img
              className="h-[100px] rounded-md"
              src={item.img}
              alt="Привет мир"
            />
          </div>
          <div className=" relative flex flex-col gap-2">
            <span className="text-xl font-medium">{item.name}</span>
            <div className="text-md">Количество: {item.count}</div>
            <div className="flex flex-col justify-center gap-3 gap-x-3">
              <h1 className="w-fit rounded-2xl bg-blue-500 p-2">
                {item.price}Р
              </h1>
              <div className="flex gap-2">
                {item.size && (
                  <p  className=" rounded-2xl border px-2 py-1">
                    Размер: {item.size}
                  </p>
                )}
                {item.color && (
                  <p className="rounded-2xl border px-2 py-1">
                    Цвет: {item.color}
                  </p>
                )}
              </div>
              <button
                onClick={() => {
                  setIsVisible(false);
                  deleteBacket(index);
                  calculatePrice();
                }}
                className="absolute -left-12 -top-7 m-4 max-w-fit self-end rounded-full bg-red-500 p-1 transition-colors hover:bg-red-600"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        </motion.li>
      )}
    </AnimatePresence>
  );
}
