"use server";

import { getAllPizzas } from "@/utils/get-all-pizzas";
import { Header } from "../_components/header";
import { AreaMenu } from "./_components/area-menu";

export default async function Menu() {

   const pizzas = await getAllPizzas();

  return (
    <>
      <Header />

      <AreaMenu pizzas={pizzas} />
    </>
  );
}
