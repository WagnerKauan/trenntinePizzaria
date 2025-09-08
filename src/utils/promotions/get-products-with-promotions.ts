"use server";

import prisma from "@/lib/prisma";
import { parsePromotions } from "./perse-promotion";


export async function getProductsWithPromotions(productsIds?: string[]) {
  
  const products = await prisma.product.findMany({
    where: {
      ...(productsIds && productsIds.length > 0 && { id: { in: productsIds } }),
      active: true,
    },
  });

  const promotions = await prisma.promotion.findMany({
    where: {
      active: true,
    },
  });

  const promotionsGlobal = parsePromotions(promotions).filter(
    (promotion) =>
      promotion.rule.minQuantity === undefined ||
      promotion.rule.minQuantity === null ||
      (promotion.rule.minQuantity === 0 && promotion.type === "COMBO")
  );

  if (!promotionsGlobal || promotionsGlobal.length < 1) {
    return products;
  }

  const productsWithPromotionalPrice = products.map((product) => {
    if (product.promotionalPrice) return product;

    for (const promotion of promotionsGlobal) {
      if (product.category === promotion.rule.category) {
        if (promotion.rule.tags?.length) {
          const allTagsPresent = promotion.rule.tags.some((tag) =>
            product.tags.includes(tag)
          );

          if (allTagsPresent) {
            const discount = Math.ceil(
              (product.price * promotion.rule.discount!) / 100
            );
            product.promotionalPrice = product.price - discount;
            break;
          }
        } else {
          const discount = Math.ceil(
            (product.price * promotion.rule.discount!) / 100
          );
          product.promotionalPrice = product.price - discount;
          break;
        }
      }
    }

    return product;
  });

  return productsWithPromotionalPrice;
}
