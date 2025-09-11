import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/utils/jwt/getCurrentUser";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: "Acesso não autorizado" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date") as string;

  if (!date) {
    return NextResponse.json({ error: "Data não informada" }, { status: 400 });
  }

  const [year, month, day] = date.split("-").map(Number);

  const startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
  const endDate = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

  try {
    const orders = await prisma.order.findMany({
      where: {
        OR: [
          {
            startsAt: {
              gte: startDate,
              lte: endDate,
            },
          },
          {
            endsAt: {
              gte: startDate,
              lte: endDate,
            },
          },
          {
            AND: [
              { startsAt: { lte: startDate } },
              { endsAt: { gte: endDate } },
            ],
          },
        ],
      },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao buscar os pedidos" },
      { status: 500 }
    );
  }
}
