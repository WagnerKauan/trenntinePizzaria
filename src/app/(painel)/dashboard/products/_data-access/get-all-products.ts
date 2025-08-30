"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/utils/jwt/getCurrentUser";



export default async function getAllProducts() {

  const user = await getCurrentUser();

  if(!user) {
    return [];
  }

  try {

    const products = await prisma.product.findMany();

    return products;

  }catch(err) {
    return [];
  }
}