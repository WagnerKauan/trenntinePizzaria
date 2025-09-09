"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/utils/jwt/getCurrentUser";
import { revalidatePath } from "next/cache";
import z from "zod";



type UpdateUser = {
  name: string;
  email: string;
  password?: string;
  isOpen: boolean;
}

const formSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
    email: z.string().min(1, { message: "O email é obrigatório." }),
    isOpen: z.boolean(),
    oldPassword: z.string().optional(),
    newPassword: z.string().optional(),
  })
  .refine(
    ({ oldPassword, newPassword }) => {
      if (oldPassword && !newPassword) return false;
      if (!oldPassword && newPassword) return false;
      return true;
    },
    {
      message:
        "O campo 'senha antiga' e 'nova senha' precisam ser preenchidos juntos.",
      path: ["newPassword"],
    }
  )
  .refine(
    ({ oldPassword, newPassword }) => {
      if (oldPassword && newPassword && oldPassword === newPassword)
        return false;
      return true;
    },
    {
      message: "O campo 'senha antiga' e 'nova senha' precisam ser diferentes.",
      path: ["newPassword"],
    }
  )
  .refine(
    ({ oldPassword, newPassword }) => {
      if (newPassword && newPassword.length < 8) return false;
      return true;
    },
    {
      message: "A senha precisa ter pelo menos 8 caracteres.",
      path: ["newPassword"],
    }
  );

  type ProfileFormData = z.infer<typeof formSchema>;

export async function updateProfile(formData: ProfileFormData) {

  const user = await getCurrentUser();

  if(!user) {
    return {
      error: "Usuário nao encontrado"
    }
  }

  const shema = formSchema.safeParse(formData);

  if (!shema.success) {
    return {
      error: shema.error.issues[0].message,
    };
  }

  try {

    if(formData.oldPassword && formData.newPassword) {

      if(user.password !== formData.oldPassword) {
        return {
          error: "Senha antiga incorreta"
        }
      }
    }

    const data: UpdateUser = {
      name: formData.name,
      email: formData.email,
      isOpen: formData.isOpen

    }

    if(formData.newPassword && formData.newPassword.trim() !== "") {
      data.password = formData.newPassword
    }

     await prisma.user.update({
      where: {
        id: user.id,
      },
      data,
    })

    revalidatePath("/dashboard/profile");

    return {
      success: "Perfil atualizado com sucesso",
    }

  }catch(err) {
    return {
      error: "Erro ao atualizar o perfil",
    }
  }
}
