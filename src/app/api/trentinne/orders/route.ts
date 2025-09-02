import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/utils/jwt/getCurrentUser";


export async function GET(request: Request) {

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Acesso não autorizado" }, { status: 401 });
  }

  try {

    const orders = await prisma.order.findMany()
    

    return NextResponse.json(orders, { status: 200 });
    
  }catch(err) {
    return NextResponse.json({ error: "Erro ao buscar os pedidos" }, { status: 500 });
  }
}