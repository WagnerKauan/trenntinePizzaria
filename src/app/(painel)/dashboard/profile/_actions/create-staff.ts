"use server";



import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/utils/jwt/getCurrentUser";
import { z } from "zod";
import bcrypt from "bcrypt"; 
import { revalidatePath } from "next/cache";


const formSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório." }),
  email: z.string().min(1, { message: "O email é obrigatório." }),
  password: z
    .string()
    .min(8, { message: "A senha precisa ter pelo menos 8 caracteres." }),
  confirmPassword: z
    .string()
    .min(8, { message: "A senha precisa ter pelo menos 8 caracteres." }),
}).refine(
  ({ password, confirmPassword }) => {
    if (password && confirmPassword && password !== confirmPassword)
      return false;
    return true;
  },
  {
    message: "As senhas precisam ser iguais.",
    path: ["confirmPassword"],
  }
)
 
type FormSchema = z.infer<typeof formSchema>;


export async function createStaff(formData: FormSchema) {

  const user = await getCurrentUser();

  if (!user) {
    return {
      error: "Usuário nao encontrado",
    };
  }

   if(user.role !== "ADMIN") {
    return {
      error: "Usuário não autorizado",
    };
  }

  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(formData.password, saltRounds);

  try {
    await prisma.user.create({
      data: {
        name: formData.name,
        email: formData.email,
        password: hashedPassword,
        role: "STAFF",
        isOpen: false
      }
    })

    revalidatePath("/dashboard/profile")

    return {
      message: "Funcionario criado com sucesso!"
    }

  } catch(err) {
    return {
      error: "Erro ao criar funcionario"
    }
  }

}