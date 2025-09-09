"use server";


import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/utils/jwt/getCurrentUser";
import { revalidatePath } from "next/cache";


export async function deleteStaff(id: string) {

  if(!id) {
    return {
      error: "Usuário nao encontrado",
    }
  }

  const user = await getCurrentUser();

  if (!user) {
    return {
      error: "Usuário nao encontrado",
    };
  }

   if(user.role !== "ADMIN") {
    return {
      error: "Usuário nao autorizado",
    };
  }

  try {

    await prisma.user.delete({
      where: {
        id: id,
      }
    })

    revalidatePath("/dashboard/profile");

    return {
      message: "Funcionario deletado com sucesso",
    }

  }catch(err) {
    return {
      error: "Erro ao deletar funcionario",
    }
  }
}