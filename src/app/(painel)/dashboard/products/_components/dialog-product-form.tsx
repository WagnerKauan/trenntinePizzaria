"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "O nome é obrigatório." }),
    description: z.string().optional(),
    ingredients: z.string().optional(),
    price: z.string().min(1, { message: "O preco é obrigatório." }),
    category: z.string().min(1, { message: "A categoria é obrigatória." }),
    isFeatured: z.boolean(),
    active: z.boolean(),
  })
  .refine(
    ({ category, description }) => {
      if (category === "pizza") {
        return !!description;
      }
      return true;
    },
    {
      message: "A descricao é obrigatória.",  
      path: ["description"],
    }
  );

export type ProductFormValues = z.infer<typeof formSchema>;

export function useProductForm({initialValues}: {initialValues?: ProductFormValues}) {
  return useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: "",
      description: "",
      ingredients: "",
      price: "",
      category: "",
      isFeatured: false,
      active: true,
    },
  });
}
