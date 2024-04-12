"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filter_data } from "@/lib/filter_data";
import { useRouter } from "next/navigation";
export default function SelectTypeProduct() {
  const router = useRouter();
  const handleChange = (category: string) => {
    router.push(`/search/${category}`);
  };
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={"Выберите тип..."} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {filter_data.map((item, index) => (
            <SelectItem
              className="hover:text-blue-500"
              key={index}
              value={item.category}
            >
              <h1 className="h-full w-full cursor-pointer text-[16px] transition-all">
                {item.text}
              </h1>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
