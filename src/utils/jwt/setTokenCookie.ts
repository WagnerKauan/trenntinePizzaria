"use server";

import { cookies } from "next/headers";



export async function setTokenCookie(token: string) {

  const cookieStore = await cookies();

  cookieStore.set({
    name: "session",
    value: token,
    httpOnly: true, // ninguém consegue acessar pelo JS
    path: "/", // disponível em todo site
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    sameSite: "lax", // segurança básica
    secure: process.env.NODE_ENV === "production",
  });
}
