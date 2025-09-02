"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "O nome é obrigatório." }),
    description: z.string().min(1, { message: "A descrição é obrigatória." }),
    type: z.enum(["PERCENT", "COMBO"]),
    active: z.boolean(),
    imageUrl: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    minQuantity: z.string().optional(),
    discount: z.string().optional(),
    bonusProduct: z.string().optional(),
  })
  .refine(
    ({ type, discount }) => {
      if (type === "PERCENT" && discount) {
        return !!discount;
      }

      return true;
    },
    {
      message: "O campo 'desconto' ou 'produto bonus' precisa ser preenchido",
      path: ["discount"],
    }
  )
  .refine(
    ({ type, bonusProduct }) => {
      if (type === "COMBO" && bonusProduct) {
        return !!bonusProduct;
      }

      return true;
    },
    {
      message: "O campo 'desconto' ou 'produto bonus' precisa ser preenchido",
      path: ["bonusProduct"],
    }
  );

export type PromotionFormValues = z.infer<typeof formSchema>;

export function usePromotionForm({ initialValues }: { initialValues?: PromotionFormValues }) {

  return useForm<PromotionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: "",
      description: "",
      type: "PERCENT",
      active: true,
      imageUrl: "",
      category: "",
      tags: [],
      minQuantity: "",
      discount: "",
      bonusProduct: "",
    },
  });
}
