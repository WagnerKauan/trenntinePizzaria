"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/utils/jwt/getCurrentUser";


const formSchema = z
  .object({
    name: z.string().min(1, { message: "O nome é obrigatório." }),
    description: z.string().optional(),
    ingredients: z.string().optional(),
    price: z.number().min(1, { message: "O preco é obrigatório." }),
    category: z.string().min(1, { message: "A categoria é obrigatória." }),
    isFeatured: z.boolean(),
    active: z.boolean(),
    tags: z.array(z.string()),
  })
  .refine(
    ({ category, description }) => {
      if (category === "pizza") {
        return !!description;
      }
      return true;
    },
    {
      message: "A descricao é obrigatória.",
      path: ["description"],
    }
  );

type FormDataProps = z.infer<typeof formSchema>;

export async function createProduct(formData: FormDataProps) {
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
    await prisma.product.create({
      data: {
        ...formData,
      },
    });

    
    revalidatePath("/dashboard/products");
    
    return {
      message: "Produto criado com sucesso",
    };
  } catch (err) {
    return {
      error: "Erro ao criar o produto",
    };
  }
}
