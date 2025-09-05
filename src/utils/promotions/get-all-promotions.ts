export interface Promotion {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
}

const promotions: Promotion[] = [
  {
    id: 1,
    name: "Promoção Família",
    price: "79,90",
    description: "2 pizzas grandes + refri por um preço especial.",
    image: "/image/promotions/promotions_1.png",
  },

  {
    id: 2,
    name: "Dupla Quente",
    price: "54,90",
    description: "Qualquer 2 sabores médios por um precinho camarada.",
    image: "/image/promotions/promotions_1.png",
  },

  {
    id: 3,
    name: "Segunda do Queijo",
    price: "39,90",
    description: "Pizza 4 queijos com 20% de desconto só hoje.",
    image: "/image/promotions/promotions_1.png",
  },
  {
    id: 4,
    name: "Promoção Família",
    price: "79,90",
    description: "2 pizzas grandes + refri por um preço especial.",
    image: "/image/promotions/promotions_1.png",
  },

  {
    id: 5,
    name: "Dupla Quente",
    price: "54,90",
    description: "Qualquer 2 sabores médios por um precinho camarada.",
    image: "/image/promotions/promotions_1.png",
  },

  {
    id: 6,
    name: "Segunda do Queijo",
    price: "39,90",
    description: "Pizza 4 queijos com 20% de desconto só hoje.",
    image: "/image/promotions/promotions_1.png",
  },
];

export async function getAllPromotions() {
  return promotions;
}
