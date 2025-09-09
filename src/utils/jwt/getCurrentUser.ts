"use server";


import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const SECRET_KEY = process.env.JWT_SECRET as string;

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };

    const user = await prisma.user.findFirst({
      where: {
        id: decoded.userId,
      }
    })

    return user
  } catch (error) {
    return null;
  }
}