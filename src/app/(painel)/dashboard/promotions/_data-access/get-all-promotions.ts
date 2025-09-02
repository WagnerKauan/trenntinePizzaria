"use server";


import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/utils/jwt/getCurrentUser";



export async function getAllPromotions() {

  const user = await getCurrentUser();

  if(!user) {
    return [];
  }

  try {

    const promotions = await prisma.promotion.findMany();

    return promotions;
  } catch (error) {
    return [];
  }
}