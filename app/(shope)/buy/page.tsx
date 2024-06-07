"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BankCart from '@/components/cart/CartBank'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Price  from "@/components/basket/Price";
const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Слишком коротко",
    })
    .max(30, {
      message: "Слишком длиное",
    }),
  lastname: z
    .string()
    .min(2, {
      message: "Слишком коротко",
    })
    .max(30, {
      message: "Слишком длиное",
    }),
  email: z.string().email({
    message: "Введите Email",
  }),
  phone: z.string().regex(/^\+\d{1,14}$/, "Неправельно введен номер телефона"),
});

export default function Page() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push('/pay')
  }

  return (
    <>
    
    <div className=" container mx-auto  justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Оплата</h1>
       <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-[50px]">
           <div className="flex gap-3">
             <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Имя</FormLabel>
                   <FormControl>
                     <Input placeholder="Кирилл..." {...field} />
                   </FormControl>
 
                   <FormMessage />
                 </FormItem>
               )}
             />
             <FormField
               control={form.control}
               name="lastname"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Фамилия</FormLabel>
                   <FormControl>
                     <Input placeholder="Ахмеров..." {...field} />
                   </FormControl>
                   <FormMessage /> 
                 </FormItem>
               )}
             />
             <FormField
               control={form.control}
               name="phone"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Телефон</FormLabel>
                   <FormControl>
                     <Input placeholder="+7 999..." type="tel" {...field} />
                   </FormControl>
                   <FormMessage />
                 </FormItem>
               )}
             />
             <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Email</FormLabel>
                   <FormControl>
                     <Input type="email" placeholder="email.ru" {...field} />
                   </FormControl>
                   <FormMessage />
                 </FormItem>
               )}
             />
           </div>
           <BankCart/>
           <div className="flex mt-[50px]">
             <Price  />
             <Button className=" grow self-center" type="submit">
               Купить
             </Button>
           </div>
         </form>
       </Form>
     </div>
    </>
  );
}
