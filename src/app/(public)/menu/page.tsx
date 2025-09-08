"use server";

import { Header } from "../_components/header";
import { getStatusPizzaria } from "../_data-access/get-status-pizzaria";
import { AreaMenu } from "./_components/area-menu";
import { getProductsWithPromotions } from "@/utils/promotions/get-products-with-promotions";

export default async function Menu() {
  const products = await getProductsWithPromotions();
  
  return (
    <>
      <Header/>

      <AreaMenu products={products} />
    </>
  );
}
