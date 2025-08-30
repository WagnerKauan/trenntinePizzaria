"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/utils/jwt/getCurrentUser";
import { revalidatePath } from "next/cache";



export async function updateProductStatus(productId: string, active: boolean) {

  const user = await getCurrentUser();

  if (!user) {
    return {
      error: "Usuário nao encontrado",
    };
  }

  try {

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        active
      }
    })

    revalidatePath("/dashboard/products");

    return {
      message: "Produto atualizado com sucesso",
    }

  }catch(err) {
    return {
      error: "Erro ao atualizar o produto",
    }
  }
}