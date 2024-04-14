import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany();
    if (!products) {
      return NextResponse.json(
        { message: "Данные не найдены" },
        { status: 300 },
      );
    }
    return NextResponse.json({ data: products }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Что то пошлои не так" },
      { status: 501 },
    );
  }
}
