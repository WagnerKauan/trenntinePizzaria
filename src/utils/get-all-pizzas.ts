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
  },

  {
    id: 2,
    name: "Trentinne Clássica",
    price: 67,
    description:
      "Uma combinação atemporal: molho artesanal, mussarela derretendo e orégano no ponto. Saborosa e perfeita pra agradar a família toda.",
    image: "/image/pizzas/trenntineClassica.png",
    isFeatured: true,
  },
  {
    id: 3,
    name: "Pepperoni Supremo",
    price: 74,
    description:
      "Camadas generosas de pepperoni crocante, cobertas com queijo bem puxento e molho da casa. É aquela que ninguém recusa!",
    image: "/image/pizzas/pepperoni.png",
    isFeatured: true,
  },
  {
    id: 5,
    name: "Quatro Queijos",
    price: 69,
    description:
      "Uma explosão de sabores com mussarela, gorgonzola, parmesão e catupiry. Cremosa e irresistível.",
    image: "/image/pizzas/quatroQueijos.png",
    isFeatured: true,
  },
  {
    id: 6,
    name: "Frango com Catupiry",
    price: 47,
    description:
      "Frango desfiado temperado na medida certa, coberto com o tradicional catupiry e mussarela derretida.",
    image: "/image/pizzas/frangoCatupiry.png",
    isFeatured: true,
  },
];; 

export async function  getAllPizzas() {
  
  return pizzas
}