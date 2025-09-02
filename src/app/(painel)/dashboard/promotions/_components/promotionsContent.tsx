"use server";

import { getAllPromotions } from "../_data-access/get-all-promotions";
import { PromotionsList } from "./promotionsList";
import { Promotion } from "@/generated/prisma";



export async function PromotionsContent() {
  
  const promotions = await getAllPromotions()


  
  return (
    <PromotionsList promotions={promotions} />
  )
}