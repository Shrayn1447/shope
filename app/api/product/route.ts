import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import type { category } from "@prisma/client";
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") as category;
    const products = await prisma.product.findMany({
      where: {
        product_category: {
          category_name: type,
        },
      },
      include: {
        product_item: {
          select: {
            price: true,
          },
        },
        product_category: {
          select: {
            category_name: true,
          },
        },
      },
    });

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
