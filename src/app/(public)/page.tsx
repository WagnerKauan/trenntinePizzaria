"use server";

import { getAllPizzas } from "@/utils/get-all-pizzas";
import { FeaturedPizzas } from "./_components/highlights/featuredPizzas";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Promotions } from "./_components/promotions/promotins";
import { getAllPromotions } from "@/utils/get-all-promotions";
import { Steps } from "./_components/steps";
import { Contact } from "./_components/contact";
import { Footer } from "./_components/footer";

 

export default async function Home() {
  
  const pizzas = await getAllPizzas();
  const promotions = await getAllPromotions();

  return (
    <>
      <Header />

      <Hero />

      <FeaturedPizzas pizzas={pizzas} />
      
      <Promotions promotions={promotions} />

      <Steps />

      <Contact />

      <Footer />
    </>
  );
}

