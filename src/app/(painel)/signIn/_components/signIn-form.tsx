"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


const signInSchema = z.object({
  email: z.string().min(1, { message: "O email é obrigatório." }),
  password: z.string().min(8, { message: "A senha precisa ter pelo menos 8 caracteres." }),
})


export type SignInFormData = z.infer<typeof signInSchema>;

export function useSignInForm() {
  return useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
}