import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface UserProfileFormProps {
  name: string | null;
  email: string | null;
}

const profileSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
    email: z.string().min(1, { message: "O email é obrigatório." }),
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

export type ProfileFormData = z.infer<typeof profileSchema>;

export function userProfileForm({ name, email }: UserProfileFormProps) {
  return useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: name || "",
      email: email || "",
      oldPassword: "",
      newPassword: "",
    },
  });
}
