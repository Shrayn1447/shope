import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import type { category } from "@prisma/client";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { searchParams } = new URL(request.nextUrl);
    const category = searchParams.get("c") as category;
    const [respons, variation] = await Promise.all([prisma.product.findUnique({
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
    }), prisma.product_category.findMany({
      where: {
        category_name:category,
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
    })])
    
    if (!respons) {
      return NextResponse.json(
        { message: "Данные не найдены" },
        { status: 300 },
      );
    }
    return NextResponse.json(
      { data: respons, variation: variation[0] },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Что то пошлои не так" },
      { status: 501 },
    );
  }
}
