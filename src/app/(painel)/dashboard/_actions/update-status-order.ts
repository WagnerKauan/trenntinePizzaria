"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/utils/jwt/getCurrentUser";
import { revalidatePath } from "next/cache";
import { z } from "zod";


const schema = z.object({
  status: z.enum(["PENDING", "PREPARATION", "CONCLUDED", "CANCELED"], {message: "O status inválido."}),
  id: z.string().min(1, { message: "O id do produto é obrigatório." }), 
});


export async function updateStatusOrder({id, status}: { id: string, status: string }) {

  const user = await getCurrentUser();

  if (!user) {
    return {
      error: "Usuário nao encontrado",
    };
  }

  const statusData = schema.safeParse({id, status});

  if (!statusData.success) {
    return {
      error: statusData.error.issues[0].message,
    };
  }

  try {

    const order = await prisma.order.update({
      where: {
        id: statusData.data?.id,
      },
      data: {
        status: statusData.data?.status
      }
    })


    revalidatePath("/dashboard");

    return {
      message: `status do pedido de ${order.name} atualizado com sucesso`,
    }
    
  }catch(err) {
    return {
      error: "Erro ao atualizar o produto",
    }
  }

}



