"use server";


import { getCurrentUser } from "@/utils/jwt/getCurrentUser";
import { redirect } from "next/navigation";
import { PromotionsContent } from "./_components/promotionsContent";


export default async function Promotions() {
  
  const user = await getCurrentUser();

  if(!user) {
    redirect("/signIn");
  }

  return (
    <PromotionsContent />
  )
}