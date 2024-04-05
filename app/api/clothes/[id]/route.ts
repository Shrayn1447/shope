import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const rest = await prisma.product.findUnique({
      where: {
        id: Number(params.id),
      },
    });
    if (!rest) {
      return NextResponse.json(
        { message: "Данные не найдены" },
        { status: 300 },
      );
    }
    return NextResponse.json({ data: rest }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Что то пошлои не так" },
      { status: 501 },
    );
  }
}
