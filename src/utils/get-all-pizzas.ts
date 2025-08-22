import { Pizza } from "@/types";

export const pizzas: Pizza[] = [
  {
    id: 1,
    name: "Marguerita da Nonna",
    price: 95,
    description:
      "Tomate fresco, manjericão e mussa-rela de búfala sobre uma base leve e crocante. Um clássico italiano com o toque da Trentinne.",
    image: "/image/pizzas/marguerita.png",
    isFeatured: true,
    ingredients: "Tomate fresco, manjericão, mussarela de búfala, massa crocante"
  },

  {
    id: 2,
    name: "Trentinne Clássica",
    price: 67,
    description:
      "Uma combinação atemporal: molho artesanal, mussarela derretendo e orégano no ponto. Saborosa e perfeita pra agradar a família toda.",
    image: "/image/pizzas/trenntineClassica.png",
    isFeatured: true,
    ingredients: "Molho artesanal, mussarela, orégano"
  },

  {
    id: 3,
    name: "Pepperoni Supremo",
    price: 74,
    description:
      "Camadas generosas de pepperoni crocante, cobertas com queijo bem puxento e molho da casa. É aquela que ninguém recusa!",
    image: "/image/pizzas/pepperoni.png",
    isFeatured: true,
    ingredients: "Pepperoni, queijo, molho da casa"
  },

  {
    id: 5,
    name: "Quatro Queijos",
    price: 69,
    description:
      "Uma explosão de sabores com mussarela, gorgonzola, parmesão e catupiry. Cremosa e irresistível.",
    image: "/image/pizzas/quatroQueijos.png",
    isFeatured: true,
    ingredients: "Mussarela, gorgonzola, parmesão, catupiry"
  },

  {
    id: 6,
    name: "Frango com Catupiry",
    price: 47,
    description:
      "Frango desfiado temperado na medida certa, coberto com o tradicional catupiry e mussarela derretida.",
    image: "/image/pizzas/frangoCatupiry.png",
    isFeatured: true,
    ingredients: "Frango desfiado, catupiry, mussarela"
  },
  {
    id: 7,
    name: "Calabresa Tradicional",
    price: 39.00,
    description: "Um clássico da pizzaria com o sabor inconfundível da calabresa fatiada.",
    ingredients: "Calabresa fatiada, cebola roxa e orégano.",
    image: "/image/pizzas/calabresa.png",
    isFeatured: false
  },
  {
    id: 8,
    name: "Milho com Bacon",
    price: 42.90,
    description: "A combinação perfeita de milho verde, bacon crocante e mussarela. ",
    ingredients: "Milho verde, bacon crocante e mussarela.",
    image: "/image/pizzas/milhoBacon.png",
    isFeatured: false
  },
  {
    id: 9,
    name: "Vegetariana",
    price: 41.90,
    description: "Uma opção leve e saborosa com tomate, pimentão, cebola, champignon e azeitona.",
    ingredients: "Tomate, pimentão, cebola, champignon e azeitona.",
    image: "/image/pizzas/vegetariana.png",
    isFeatured: false
  },
  {
    id: 10,
    name: "Pepperoni Picante",
    price: 45.90,
    description: "Para os amantes de sabores fortes, pepperoni apimentado com toque de pimenta calabresa.",
    ingredients: "Pepperoni apimentado com toque de pimenta calabresa.",
    image: "/image/pizzas/pepperoniPicante.png",
    isFeatured: false
  },
  {
    id: 11,
    name: "Havaiana",
    price: 42.00,
    description: "Uma mistura agridoce surpreendente de presunto, abacaxi e queijo mussarela.",
    ingredients: "Presunto, abacaxi e queijo mussarela.",
    image: "/image/pizzas/havaiana.png",
    isFeatured: false
  },
  {
    id: 12,
    name: "BBQ Bacon",
    price: 46.90,
    description: "Sabor defumado com bacon, frango desfiado e molho barbecue. Deliciosa e marcante.",
    ingredients: "Bacon, frango desfiado e molho barbecue.",
    image: "/image/pizzas/bbqBacon.png",
    isFeatured: false
  },
  {
    id: 13,
    name: "Margherita",
    price: 40.90,
    description: "A pizza mais tradicional da Itália, com mussarela, tomate, manjericão e azeite.",
    ingredients: "Mussarela, tomate, manjericão e azeite.",
    image: "/image/pizzas/margherita.png",
    isFeatured: false
  },
]


export async function  getAllPizzas() {
  
  return pizzas
}


const menu = [
  
];