"use server";

import { Product } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { getProductsWithPromotions } from "@/utils/promotions/get-products-with-promotions";
import { z } from "zod";
import { getAllPromotions } from "../_data-access/get-all-promotions";
import { parsePromotions } from "@/utils/promotions/perse-promotion";
import { checkValidPromotion } from "@/utils/promotions/check-valid-promotion";

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
    const productIds = formData.items.map((product) => product.id);
    const products = await getProductsWithPromotions(productIds);
    const productsInCart = products.map((product) => ({
      ...product,
      quantity: formData.items.find((item) => item.id === product.id)!.quantity,
    }));

    const totalQuantityCart = productsInCart.reduce(
      (acc, product) => acc + product.quantity!,
      0
    );

    const promotions = await getAllPromotions();
    const parsedPromotions = parsePromotions(promotions).filter(
      (promotion) =>
        promotion.rule.minQuantity !== undefined ||
        promotion.rule.minQuantity !== null ||
        promotion.rule.minQuantity !== 0
    );

    const orderPromotions = parsedPromotions.filter((promotion) =>
      checkValidPromotion(promotion, productsInCart, totalQuantityCart)
    );

    const discount = orderPromotions.reduce((acc, promotion) => {
      if (promotion.type === "PERCENT") {
        return acc + promotion.rule.discount!;
      }

      return acc;
    }, 0);

    const totalCart = productsInCart.reduce((acc, product) => {
      if (product.promotionalPrice) {
        return acc + product.promotionalPrice * product.quantity!;
      } else {
        return acc + product.price * product.quantity!;
      }
    }, 0);

    const totalCartWithDiscount = Math.ceil(
      discount === 0 ? totalCart : totalCart - (totalCart * discount) / 100
    );
    
    const bonusProducts = orderPromotions
      .filter((promotion) => promotion.type === "COMBO")
      .map((promotion) => promotion.rule.bonusProduct!);

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();

    const startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

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
        total: totalCartWithDiscount,
        bonusProducts:
          bonusProducts && bonusProducts.length > 0 ? bonusProducts : [],
        appliedPromotionName: orderPromotions
          .map((promotion) => promotion.name)
          .join(","),

        startsAt: startDate,
        endsAt: endDate,
      },
    });

    return newOrder;
  } catch (err) {
    return {
      error: "Ocorreu um erro ao criar o pedido.",
    };
  }
}
