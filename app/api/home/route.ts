import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";
export async function GET(_:NextRequest, ) {
  try {
    const products = await prisma.product.findMany({
      include: {
        product_item: {
          select: {
            price: true,
          },
        },
        product_category: true,
      },
    });
    if (!products) {
      return NextResponse.json(
        { message: "Данные не найдены" },
        { status: 300 },
      );
    }
    console.log(products)
    return NextResponse.json({ data: products }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Что то пошлои не так" },
      { status: 501 },
    );
  }
}
