import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    let whereCondition = {};
    if (query !== null) {
      whereCondition = {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            }
          },
          {
            brand: {
              contains: query,
              mode: 'insensitive',
            }
          }
        ]
      }
    }
    const products = await prisma.product.findMany({
      where:whereCondition,
      select:{
        id:true,
        name:true,
        gender:true,
        brand:true
      }
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
