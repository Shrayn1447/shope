"use client";
import { useEffect, useState } from "react";
import { Backet } from "@/store/backet";
import { useBacketStore } from "@/store/backet";
import { motion, AnimatePresence } from "framer-motion";

export default function BasketElement({
  item,
  index,
}: {
  item: Backet;
  index: number;
}) {
  const deletBacketElement = useBacketStore((state) => state.deleteBacket);
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
          <div className="">
            <span className="text-xl font-medium">{item.name}</span>
            <div className="flex items-center gap-x-3">
              <span className="w-fit rounded-2xl bg-blue-500 p-2">
                {item.price}Р
              </span>
              <span className="rounded-2xl border p-2">{item.size}</span>
              <span
                className="h-5 w-5 rounded-full border"
                style={{
                  backgroundColor: item.color,
                }}
              ></span>
              <button
                onClick={() => {
                  setIsVisible(false);
                  deletBacketElement(index);
                }}
                className="m-4 max-w-fit self-end rounded-md bg-red-500 p-1"
              >
                Удалить
              </button>
            </div>
          </div>
        </motion.li>
      )}
    </AnimatePresence>
  );
}
