"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/utils/jwt/getCurrentUser";


const formSchema = z
  .object({
    productId: z.string().min(1, { message: "O id do produto é obrigatório." }),
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


type FormSchema = z.infer<typeof formSchema>;


export async function updateProduct(formData: FormSchema) {

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

  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }

  try {
     await prisma.product.update({
      where: {
        id: formData.productId,
      },
      data: {
        name: formData.name,
        description: formData.description,
        ingredients: "",
        price: formData.price,
        category: formData.category,
        tags: formData.tags,
        isFeatured: formData.isFeatured,
        active: formData.active,
      },
    });

    revalidatePath("/dashboard/products");

    return {
      message: "Produto atualizado com sucesso",
    };

  }catch(err) {
    return {
      error: "Erro ao atualizar o produto"
    }
  }
}