"use server";


import prisma from "@/lib/prisma";

export async function getAllPromotions() {
  return await prisma.promotion.findMany({
    where: {
      active: true,
    },
  });
}