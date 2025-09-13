"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { createToken } from "@/utils/jwt/createToken";
import { setTokenCookie } from "@/utils/jwt/setTokenCookie";
import bcrypt from "bcrypt";

const signInSchema = z.object({
  email: z.string().min(1, { message: "O email é obrigatório." }),
  password: z
    .string()
    .min(8, { message: "A senha precisa ter pelo menos 8 caracteres." }),
});

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const schema = signInSchema.safeParse({ email, password });

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }

  try {
  const user = await prisma.user.findUnique({ where: { email } });
  console.log("user:", user);

  if (!user) return { error: "Usuário não encontrado." };

  console.log("user.password:", user.password);
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log("isPasswordValid:", isPasswordValid);

  const token = await createToken(user.id);
  console.log("token criado:", token);

  await setTokenCookie(token);

  return { message: "Login efetuado com sucesso." };
} catch (err) {
  console.error("Erro no login:", err);
  return { error: "Erro ao efetuar login." };
}

}
