"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/utils/jwt/getCurrentUser";
import { revalidatePath } from "next/cache";
import z from "zod";

const schema = z.object({
  promotionId: z.string().min(1, { message: "O id da promoção é obrigatório." }),
  promotionImageUrl: z.string().min(1, { message: "A imagem é obrigatória." }),
});

type FormData = z.infer<typeof schema>;

export async function uploadPromotionImage(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      error: "Usuário nao encontrado",
    };
  }

  const shema = schema.safeParse(formData);

  if (!shema.success) {
    return {
      error: shema.error.issues[0].message,
    };
  }

  try {
    await prisma.promotion.update({
      where: {
        id: formData.promotionId,
      },
      data: {
        imageUrl: formData.promotionImageUrl,
      },
    });

    revalidatePath("/dashboard/promotions");

    return {
      message: "Foto da promoção atualizada com sucesso",
    };
  } catch (err) {
    return {
      error: "Erro ao atualizar a foto da promoção",
    };
  }
}
