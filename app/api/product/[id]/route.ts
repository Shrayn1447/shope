import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { searchParams } = new URL(request.nextUrl);
    const c = searchParams.get("c");
    const respons = await prisma.product.findUnique({
      where: {
        id: Number(params.id),
      },
      include: {
        product_item: {
          include: {
            product_configuration: {
              include: {
                variation_option: true,
              },
            },
          },
        },
      },
    });
    const variation = await prisma.product_category.findMany({
      where: {
        category_name: c,
      },
      include: {
        variation: {
            include: {
              variation_option: {
                select: {
                  value:true
                }
              }
            }  
        },
      },
    });

    if (!respons) {
      return NextResponse.json(
        { message: "Данные не найдены" },
        { status: 300 },
      );
    }
    return NextResponse.json({ data: respons, variation:variation[0] }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Что то пошлои не так" },
      { status: 501 },
    );
  }
}
