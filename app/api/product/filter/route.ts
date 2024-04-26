import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { Value } from "@radix-ui/react-select";
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("pd");
    const color = searchParams.get("color");
    const size = searchParams.get("size");
    const filter = await prisma.variation_option.findMany({
      where: {
        OR: [
          {
            value: color!,
          },
          {
            value: size!,
          },
          {
            AND: {},
          },
        ],
      },
      include: {
        product_configuration: {
          include: {
            product_item: {},
          },
        },
      },
    });

    if (!filter) {
      return NextResponse.json(
        { message: "Данные не найдены" },
        { status: 300 },
      );
    }
    return NextResponse.json({ data: filter }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Что то пошлои не так" },
      { status: 501 },
    );
  }
}
