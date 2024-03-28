import { NextResponse, NextRequest } from "next/server";
import { hash } from "bcrypt";
import prisma from "@/lib/prisma";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, username, password } = body;
    const existingEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingEmail) {
      return NextResponse.json(
        { user: null, message: "Такой пользователь уже существует" },
        { status: 409 },
      );
    }
    const existingUserName = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (existingUserName) {
      return NextResponse.json(
        { user: null, message: "Такой пользователь уже существует" },
        { status: 410 },
      );
    }
    const newHashPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: newHashPassword,
      },
    });
    const { password: newUserPassword, ...rest } = newUser;
    return NextResponse.json(
      { user: rest, message: "You'r create new User" },
      { status: 201 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Что-то пошло не так" },
      { status: 501 },
    );
  }
}
