"use server";

import { redirect } from "next/navigation";
import { getStatusPizzaria } from "../_data-access/get-status-pizzaria";
import { CheckoutContent } from "./_components/checkout-content";



export default async function Checkout() {

  const statusPizzaria = await getStatusPizzaria();

  if(!statusPizzaria!.isOpen) {
    redirect("/menu");
  }

  return (
    <CheckoutContent />
  )
}