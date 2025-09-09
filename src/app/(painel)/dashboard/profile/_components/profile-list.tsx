"use client";

import { User } from "@/generated/prisma";
import { ProfileFormData, userProfileForm } from "./profile-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { NewStaff } from "./new-staff-dialog";
import { clearToken } from "@/utils/jwt/clearToken";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { deleteStaff } from "../_actions/delete-staff";

interface ProfileListProps {
  user: User;
  staffs: User[];
}

export function ProfileList({ user, staffs }: ProfileListProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
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

  async function handleLogout() {
    await clearToken();
    redirect("/signIn");
  }

  async function handleDeleteStaff(staffId: string) {
    const response = await deleteStaff(staffId);
    if (response.error) {
      toast.error(response.error);
      return;
    }
    toast.success(response.message);
  }

  return (
    <div className="mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-dark-normal text-xl font-semibold">
                Meu Perfil {user.role === "ADMIN" ? "(Admin)" : "(Funcionario)"}
              </CardTitle>

              <Button
                size={"icon"}
                className="cursor-pointer"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setDialogOpen(true);
                }}
              >
                <Plus className="w-5 h-5" color="#fff" />
              </Button>
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

                {user.role === "ADMIN" && (
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
                            disabled={user.role !== "ADMIN"}
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
                      )}
                    />
                  </div>
                )}

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

                <div className="space-y-4">
                  <h2 className="text-base font-semibold text-gray-500">
                    Funcionarios
                  </h2>
                  {user.role === "ADMIN" && staffs.length > 0 && (
                    <ScrollArea className="h-50 pr-2">
                      <ul className="space-y-3">
                        {staffs.map((staff) => (
                          <li
                            key={staff.id}
                            className="flex items-center justify-between rounded-xl border p-3 shadow-sm bg-white hover:bg-gray-50 transition"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-900">
                                {staff.name}
                              </span>
                              <span className="text-sm text-gray-500">
                                {staff.email}
                              </span>
                            </div>

                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDeleteStaff(staff.id);
                              }}
                              className="cursor-pointer rounded-full"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  )}
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

      <section className="mt-4">
        <Button
          className="cursor-pointer"
          variant={"destructive"}
          onClick={handleLogout}
        >
          Sair da conta
        </Button>
      </section>

      <NewStaff isOpen={dialogOpen} onClose={setDialogOpen} />
    </div>
  );
}
