"use client";

import { useSelector } from "react-redux";
import { Header } from "../_components/header";
import { CheckoutList } from "./_components/checkout-list";
import { selectCartItems } from "@/store/cart/cartSelectors";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";



export default function Checkout() {

  const cartItems = useSelector(selectCartItems);

  const router = useRouter();

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/menu");
    }
  }, [cartItems, router])
  
  if(cartItems.length === 0) {
    toast.info("Seu carrinho está vazio.")
    return null
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/image/bg_checkout.png')] bg-no-repeat bg-cover bg-center w-full ">
      <Header />


      <section className="w-full max-w-xl p-4 bg-white rounded-xl opacity-95">
        <CheckoutList />
      </section>
    </div>
  )
}