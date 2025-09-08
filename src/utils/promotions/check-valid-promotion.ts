import { Product } from "@/generated/prisma";
import { ParsedPromo } from "./perse-promotion";


export function checkValidPromotion(
  promo: ParsedPromo,
  cartItems: Product[],
  totalQuantityCart: number
) {
  const { minQuantity, category, tags } = promo.rule;

  if (!minQuantity) return false;

  if (minQuantity && totalQuantityCart < minQuantity) return false;

  if (category) {
    const countCategory = cartItems
      .filter((item) => item.category === category)
      .reduce((total, item) => total + (item.quantity || 1), 0);

    if (countCategory < minQuantity) return false;
  }

  if (tags && tags.length > 0) {
    const itemTags = cartItems.flatMap((item) => item.tags);

    const allTagsPresent = tags.every((tag) => itemTags.includes(tag));

    if (!allTagsPresent) return false;
  }

  return true;
}
