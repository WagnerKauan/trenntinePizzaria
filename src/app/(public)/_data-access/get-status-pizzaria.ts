"use server";

import prisma from "@/lib/prisma";


export async function getStatusPizzaria() {
  
  return await prisma.user.findFirst({
    where: {
      role: "ADMIN"
    },
    select: {
      isOpen: true
    }
  });
}