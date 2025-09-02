

export interface ParsedPromo {
  id: string;
  name: string;
  type: "PERCENT" | "COMBO";
  active: boolean;
  rule: {
    category: string;
    tags: string[];
    minQuantity: number | undefined;
    discountPercent: number | undefined;
    bonusProductId: string | undefined;
  }
};

export function parsePromotions(rawPromos: any[]): ParsedPromo[] {
  return rawPromos.map((promo) => ({
    id: promo.id,
    name: promo.name,
    type: promo.type,
    active: promo.active,
    rule: {
      category: promo.category,
      tags: promo.tags,
      minQuantity: promo.minQuantity ? Number(promo.minQuantity) : undefined,
      discountPercent: promo.type === "PERCENT" ? Number(promo.discount) : undefined,
      bonusProductId: promo.type === "COMBO" ? promo.bonusProduct : undefined,
    },
  }));
}
