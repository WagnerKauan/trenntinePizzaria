"use server";

import { User } from "@/generated/prisma";
import { getAllPromotions } from "../_data-access/get-all-promotions";
import { PromotionsList } from "./promotionsList";


interface PromotionContentProps {
  user: User;
}

export async function PromotionsContent({  user }: PromotionContentProps) {
  
  const promotions = await getAllPromotions()


  
  return (
    <PromotionsList promotions={promotions} user={user} />
  )
}