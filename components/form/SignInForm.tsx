"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const FormSchema = z.object({
  email: z.string().min(1, "Неверный Email").email("Неверный Email"),
  password: z.string().min(1, "Неверный пароль").min(8, "Минимум 8 символов"),
});
export default function SignInForm() {
  const [status, setStatus] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      username: "alexx",
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (signInData?.ok) {
      router.push("/");
    } else {
      setStatus(true);
      console.error("Ошибка Авторизации");
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-[500px] flex-col gap-[15px] rounded border bg-card p-6"
      >
        <FormLabel className="text-center">Вход</FormLabel>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="h-[45px] w-full rounded-md"
                  placeholder="Email"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="h-[45px] w-full rounded-md"
                  type="password"
                  placeholder="Пароль"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {status && (
          <h1 className="text-red-500">* Неверный пароль или почта</h1>
        )}
        <Button
          className="mt-[15px] h-[45px] w-full self-center bg-[#0171d3] hover:bg-[#0161d3]"
          type="submit"
        >
          Войти
        </Button>
        <div className="relative text-center text-gray-400 before:absolute before:left-0 before:top-[50%] before:h-[2px] before:w-[45%]   before:bg-gray-200 after:absolute after:right-0 after:top-[50%] after:h-[2px] after:w-[45%] after:bg-gray-200">
          или
        </div>
        <div className=" flex gap-2 self-center text-center text-sm">
          <p>Нет аккаунта</p>
          <Link
            href={"/sign-up"}
            className="text-sm text-blue-400 hover:underline"
          >
            Регистрация
          </Link>
        </div>
      </form>
    </Form>
  );
}
