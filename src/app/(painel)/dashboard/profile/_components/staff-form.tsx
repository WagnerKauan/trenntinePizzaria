"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "O nome é obrigatório." }),
    email: z.string().min(1, { message: "O email é obrigatório." }),
    password: z
      .string()
      .min(8, { message: "A senha precisa ter pelo menos 8 caracteres." }),
    confirmPassword: z
      .string()
      .min(8, { message: "A senha precisa ter pelo menos 8 caracteres." }),
  })
  .refine(
    ({ password, confirmPassword }) => {
      if (password && confirmPassword && password !== confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "As senhas precisam ser iguais.",
      path: ["confirmPassword"],
    }
  );

export type FormSchema = z.infer<typeof formSchema>;

export function staffForm() {
  return useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
}
