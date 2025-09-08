"use client";

import { Prisma } from "@/generated/prisma";
import { ProfileFormData, userProfileForm } from "./profile-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { updateProfile } from "../_actions/update-profile";
import { toast } from "sonner";
import { PasswordInput } from "./input-password";
import { useEffect } from "react";

type User = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    email: true;
    isOpen: true;
  };
}>;

interface ProfileListProps {
  user: User;
}

export function ProfileList({ user }: ProfileListProps) {
  const form = userProfileForm({
    name: user.name,
    email: user.email,
    isOpen: user.isOpen,
  });

  useEffect(() => {
    form.reset({
      name: user.name!,
      email: user.email,
    });
  }, [user]);

  async function onSubmit(values: ProfileFormData) {
    const response = await updateProfile({
      ...values,
      isOpen: values.isOpen === "active" ? true : false,
    });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    form.reset();
    toast.success("Perfil atualizado com sucesso!");
  }

  return (
    <div className="mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader className="text-dark-normal text-xl font-semibold">
              Meu Perfil
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-base font-semibold text-gray-500">
                    Informações pessoais
                  </h2>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Seu nome..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="seu@email.com"
                            disabled={true}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h2 className="text-base font-semibold text-gray-500">
                    Status do estabelecimento
                  </h2>

                  <FormField
                    control={form.control}
                    name="isOpen"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Aberto</SelectItem>
                            <SelectItem value="inactive">Fechado</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                </div>

                <div className="space-y-4">
                  <h2 className="text-base font-semibold text-gray-500">
                    Alterar Senha
                  </h2>

                  <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <PasswordInput
                            placeholder="Senha atual..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <PasswordInput
                            placeholder="Nova senha..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  variant={"default"}
                  className="cursor-pointer bg-emerald-500 hover:bg-emerald-600 duration-300 w-full"
                >
                  Salvar
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
