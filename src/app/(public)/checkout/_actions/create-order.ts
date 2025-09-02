"use server";

import { Product } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { z } from "zod";

const formSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "O nome precisa ter pelo menos 3 caracteres." }),
    phone: z
      .string()
      .min(10, { message: "Telefone inválido." })
      .regex(/^\d+$/, { message: "O telefone deve conter apenas números." }),
    email: z.string().optional(),
    cep: z
      .string()
      .min(8, { message: "CEP inválido." })
      .regex(/^\d{5}-?\d{3}$/, {
        message: "CEP deve estar no formato 12345-678.",
      }),
    street: z.string().min(1, { message: "A rua é obrigatória." }),
    number: z.string().min(1, { message: "O número é obrigatório." }),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, { message: "O bairro é obrigatório." }),
    referencePoint: z
      .string()
      .min(1, { message: "O ponto de referência é obrigatório." }),
    methodPayment: z.enum(["Pix", "Cartão", "Dinheiro"]),
    changeFor: z.string().optional(),
    notes: z.string().optional(),
    items: z.array(z.object() as z.ZodType<Product>) as z.ZodType<Product[]>,
  })
  .refine(
    (data) => {
      if (data.methodPayment === "Dinheiro") {
        return !!data.changeFor && data.changeFor.trim() !== "";
      }

      return true;
    },
    {
      message: "Informe o valor para troco.",
      path: ["changeFor"],
    }
  );

type CheckoutFormData = z.infer<typeof formSchema>;

export async function createOrder(formData: CheckoutFormData) {
  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }

  try {
    const productsInCart = await prisma.product.findMany({
      where: {
        id: {
          in: formData.items.map((item) => item.id),
        },
      },
    });

    const totalCart = productsInCart.reduce(
      (acc, product) => acc + product.price,
      0
    );

    const newOrder = await prisma.order.create({
      data: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        cep: formData.cep,
        street: formData.street,
        number: formData.number,
        complement: formData.complement,
        neighborhood: formData.neighborhood,
        referencePoint: formData.referencePoint,
        methodPayment: formData.methodPayment,
        changeFor: formData.changeFor,
        notes: formData.notes,
        items: formData.items,
        total: totalCart,
      },
    });

    return newOrder;
  } catch (err) {
    return {
      error: "Ocorreu um erro ao criar o pedido.",
    };
  }
}
