"use server";

import { Header } from "../_components/header";
import { AreaMenu } from "./_components/area-menu";
import { getProductsWithPromotions } from "@/utils/promotions/get-products-with-promotions";

export default async function Menu() {

   const products = await getProductsWithPromotions();

   console.log(products.length)

  return (
    <>
      <Header />

      <AreaMenu products={products} />
    </>
  );
}
