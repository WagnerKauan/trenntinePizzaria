"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/utils/jwt/getCurrentUser";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "O nome é obrigatório." }),
    description: z.string().min(1, { message: "A descrição é obrigatória." }),
    type: z.enum(["PERCENT", "COMBO"]),
    active: z.boolean(),
    imageUrl: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    minQuantity: z.number().optional(),
    discount: z.number().optional(),
    bonusProduct: z.string().optional(),
  })
  .refine(
    ({ type, discount }) => {
      if (type === "PERCENT") {
        return !!discount;
      }

      return true;
    },
    {
      message: "O campo 'desconto' ou 'produto bonus' precisa ser preenchido",
      path: ["discount"],
    }
  )
  .refine(
    ({ type, bonusProduct }) => {
      if (type === "COMBO") {
        return !!bonusProduct;
      }

      return true;
    },
    {
      message: "O campo 'desconto' ou 'produto bonus' precisa ser preenchido",
      path: ["bonusProduct"],
    }
  );

  type PromotionFormValues = z.infer<typeof formSchema>;

export async function createPromotion(formData: PromotionFormValues) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      error: "Usuário nao encontrado",
    };
  }

  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }


  try {

    await prisma.promotion.create({
      data: {
        name: formData.name,
        description: formData.description,
        type: formData.type,
        active: formData.active,
        imageUrl: formData.imageUrl,
        rules: {
          category: formData.category,
          tags: formData.tags,
          minQuantity: formData.minQuantity,
          discount: formData.discount,
          bonusProduct: formData.bonusProduct
        }
      }
    })

    revalidatePath("/dashboard/promotions");

    return {
      message: "Promoção criada com sucesso",
    }

  }catch(err){
    return {
      error: "Erro ao criar a promoção",
    }
  }

  
}
