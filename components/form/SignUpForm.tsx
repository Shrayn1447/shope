"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
const FormSchema = z
  .object({
    username: z.string().min(5, "Слишком короткий"),
    email: z.string().min(1, "Неверный Email").email("Неверный Email"),
    password: z.string().min(1, "Неверный пароль").min(6, "Слишком кароткий"),
    confirm_password: z
      .string()
      .min(1, "Неверный пароль")
      .min(6, "Слишком кароткий"),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Пароли не совподают",
  });
export default function SignUpForm() {
  const route = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        username: values.username,
        password: values.password,
      }),
    });
    if (response.ok) {
      route.push("/sign-in");
    } else {
      console.error("Ошибка регистрации");
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-[500px] flex-col gap-[13px] rounded border p-6"
      >
        <FormLabel className="text-center">Регистрация</FormLabel>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Name"
                  type="text"
                  {...field}
                />
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
              <FormControl>
                <Input
                  className="w-full"
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
                  className="w-full"
                  type="password"
                  placeholder="Пароль"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-full"
                  type="password"
                  placeholder="Повторите пароль"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="mt-[15px] h-[45px] w-full self-center bg-[#0171d3] hover:bg-[#0161d3]"
          type="submit"
        >
          Зарегистрироваться
        </Button>
        <div className="relative text-center text-gray-400 before:absolute before:left-0 before:top-[50%] before:h-[2px] before:w-[45%]   before:bg-gray-200 after:absolute after:right-0 after:top-[50%] after:h-[2px] after:w-[45%] after:bg-gray-200">
          или
        </div>
        <div className=" self-center text-center text-sm">
          <p>Если у вас есть аккаунта</p>
          <Link
            href={"/sign-in"}
            className="text-sm text-blue-400 hover:underline"
          >
            Вход
          </Link>
        </div>
      </form>
    </Form>
  );
}
