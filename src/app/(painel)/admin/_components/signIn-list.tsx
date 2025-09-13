"use client";

import {Form ,FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignInFormData, useSignInForm } from "./signIn-form";
import { signIn } from "../_actions/auth";
import { toast } from "sonner";
import { redirect } from "next/navigation";



export function SignInList() {
  
  const form = useSignInForm();

  async function onSubmit(data: SignInFormData) {
    
    const response = await signIn(data);

    if(response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("Logado com sucesso!");
    form.reset();

    redirect("/dashboard");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 p-8">
          <h1 className="text-2xl font-semibold text-white text-center">Adiministração</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input placeholder="seu@email.com" {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="cursor-pointer bg-primary-normal hover:bg-primary-dark duration-200">
              Entrar
          </Button>
        </div>
      </form>
    </Form>
  )
}