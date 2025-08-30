"use server";

import { FeaturedPizzas } from "./_components/highlights/featuredPizzas";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Promotions } from "./_components/promotions/promotins";
import { getAllPromotions } from "@/utils/get-all-promotions";
import { Steps } from "./_components/steps";
import { Contact } from "./_components/contact";
import { Footer } from "./_components/footer";
import { getAllProducts } from "./_data-access/get-all-products";

 

export default async function Home() {
  
  const products = await getAllProducts();
  const promotions = await getAllPromotions();

  return (
    <>
      <Header />

      <Hero />

      <FeaturedPizzas products={products} />
      
      <Promotions promotions={promotions} />

      <Steps />

      <Contact />

      <Footer />
    </>
  );
}

