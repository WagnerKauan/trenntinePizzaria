

export interface ParsedPromo {
  id: string;
  name: string;
  type: "PERCENT" | "COMBO";
  active: boolean;
  rule: {
    category: string;
    tags: string[];
    minQuantity: number | undefined;
    discount: number | undefined;
    bonusProduct: string | undefined;
  }
};

export function parsePromotions(rawPromos: any[]): ParsedPromo[] {
  return rawPromos.map((promo) => ({
    id: promo.id,
    name: promo.name,
    type: promo.type,
    active: promo.active,
    rule: {
      category: promo.rules.category,
      tags: promo.rules.tags,
      minQuantity: promo.rules.minQuantity ? Number(promo.rules.minQuantity) : undefined,
      discount: promo.type === "PERCENT" ? Number(promo.rules.discount) : undefined,
      bonusProduct: promo.type === "COMBO" ? promo.rules.bonusProduct : undefined,
    },
  }));
}
