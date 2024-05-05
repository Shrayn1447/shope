import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/utils/prisma";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string, category:string } },
) {
  try {
    const product = await prisma.product.findUnique({
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
        product_category: {
            select:{
              category_name:true
            }
        }
      },
    })
    const variation = await prisma.product_category.findMany({
      where: {
        category_name:product?.product_category?.category_name,
      },
      include: {
        variation: {
          include: {
            variation_option: {
              select: {
                value: true,
              },
            },
          },
        },
      },
    })
    if (!product) {
      return NextResponse.json(
        { message: "Данные не найдены" },
        { status: 300 },
      );
    }
    return NextResponse.json(
      { data: product, variation: variation[0] },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Что то пошлои не так" },
      { status: 501 },
    );
  }
}
