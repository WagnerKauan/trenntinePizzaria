"use server";

import { Header } from "../_components/header";
import { AreaMenu } from "./_components/area-menu";
import { getAllProducts } from "../_data-access/get-all-products";

export default async function Menu() {

   const products = await getAllProducts();

  return (
    <>
      <Header />

      <AreaMenu products={products} />
    </>
  );
}
