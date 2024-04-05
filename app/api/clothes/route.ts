import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    let whereCondition = {};
    if (type !== null) {
      whereCondition = {
        category: type,
      };
    }
    const products = await prisma.product.findMany({
      where: whereCondition,
      include: {
        color: {
          select: {
            color: true,
          },
        },
        size: {
          select: {
            size: true,
          },
        },
      } as never,
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
