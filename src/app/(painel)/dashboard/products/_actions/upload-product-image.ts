"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/utils/jwt/getCurrentUser";
import { revalidatePath } from "next/cache";

export async function uploadProductImage({
  productImageUrl,
  productId,
}: {
  productImageUrl: string;
  productId: string;
}) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      error: "Usuário nao encontrado",
    };
  }

  if (!productImageUrl) {
    return {
      error: "Imagem nao encontrada",
    };
  }

  if (!productId) {
    return {
      error: "Produto nao encontrado",
    };
  }

  try {
    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        imageUrl: productImageUrl,
      },
    });

    revalidatePath("/dashboard/products");
    return {
      message: "Imagem do produto atualizada com sucesso",
    }
  } catch (err) {
    return {
      error: "Erro ao atualizar imagem do produto",
    };
  }
}
