"use client";

import { CheckoutData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface CheckoutFormProps extends CheckoutData {}

const checkoutSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "O nome precisa ter pelo menos 3 caracteres." }),
    phone: z
      .string()
      .min(10, { message: "Telefone inválido." })
      .regex(/^\d+$/, { message: "O telefone deve conter apenas números." }),
    email: z.string().optional(),
    cep: z
      .string()
      .min(8, { message: "CEP inválido." })
      .regex(/^\d{5}-?\d{3}$/, {
        message: "CEP deve estar no formato 12345-678.",
      }),
    street: z.string().min(1, { message: "A rua é obrigatória." }),
    number: z.string().min(1, { message: "O número é obrigatório." }),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, { message: "O bairro é obrigatório." }),
    referencePoint: z
      .string()
      .min(1, { message: "O ponto de referência é obrigatório." }),
    methodPayment: z.enum(["Pix", "Cartão", "Dinheiro"]),
    changeFor: z.string().optional(),
    notes: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.methodPayment === "Dinheiro") {
        return !!data.changeFor && data.changeFor.trim() !== "";
      }

      return true;
    },
    {
      message: "Informe o valor para troco.",
      path: ["changeFor"],
    }
  );

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export function useCheckoutForm(checkoutFormData: CheckoutFormProps) {
  return useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: checkoutFormData?.name || "",
      phone: checkoutFormData?.phone || "",
      email: checkoutFormData?.email || "",
      cep: checkoutFormData?.cep || "",
      street: checkoutFormData?.street || "",
      number: checkoutFormData?.number || "",
      complement: checkoutFormData?.complement || "",
      neighborhood: checkoutFormData?.neighborhood || "",
      referencePoint: checkoutFormData?.referencePoint || "",
      methodPayment: checkoutFormData?.methodPayment || "Dinheiro",
      changeFor: checkoutFormData?.changeFor || "",
      notes: "",
    },
  });
}
