"use server";

import prisma from "@/lib/prisma";

export async function getUserInfo(userId: string) {
  try {
    if (!userId) return null;

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      }, 
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    if (!user) return null;

    return user;
  } catch (err) {
    return null;
  }
}
