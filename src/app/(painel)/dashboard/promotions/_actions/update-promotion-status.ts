"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/utils/jwt/getCurrentUser";
import { revalidatePath } from "next/cache";

export async function updatePromotionStatus(
  promotionId: string,
  active: boolean
) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      error: "Usuário nao encontrado",
    };
  }

   if(user.role !== "ADMIN") {
    return {
      error: "Usuário não autorizado",
    };
  }

  try {
    const response = await prisma.promotion.update({
      where: {
        id: promotionId,
      },
      data: {
        active,
      },
    });

    revalidatePath("/dashboard/promotions");

    return {
      message: `Promoção ${active ? "ativada" : "desativada"} com sucesso`,
    };
  } catch (err) {
    return {
      error: "Erro ao atualizar a promoção",
    };
  }
}
