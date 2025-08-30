"use client";

import { DialogHeader } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useProductForm, ProductFormValues } from "./dialog-product-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { createProduct } from "../_actions/create-product";
import { convertReal } from "@/utils/convertReal";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { updateProduct } from "../_actions/update-product";
import { useRouter } from "next/navigation"

interface DialogProductProps {
  onOpenChange: () => void;
  productId?: string;
  initialValues?: {
    productId: string;
    name: string;
    category: string;
    description: string;
    price: string;
    active: boolean;
    tags: string[];
    isFeatured: boolean;
  };
}

export function DialogProduct({
  onOpenChange,
  productId,
  initialValues,
}: DialogProductProps) {
  const [tags, setTags] = useState<string[]>(initialValues?.tags || []);
  const [loading, setLoading] = useState(false);
  const form = useProductForm({ initialValues });
  const category = form.watch("category");
  const router = useRouter();

  const productTags: Record<string, string[]> = {
    pizza: [
      "Calabresa",
      "Mussarela",
      "Portuguesa",
      "Margherita",
      "Pepperoni",
      "Frango",
      "Queijo",
      "Napolitana",
      "Bacon",
      "Brócolis",
      "Vegana",
      "Vegetariana",
      "Doce",
      "Apimentada",
      "Especial da Casa",
      "4 Queijos",
    ],
    drink: ["Refrigerante", "Suco Natural", "Água Mineral", "Cerveja", "Vinho"],
  };

  async function onSubmit(formData: ProductFormValues) {
    
    setLoading(true);

    if (productId) {
      const response = await updateProduct({
        ...formData,
        productId,
        price: convertReal(formData.price),
        tags,
      });

      if (response.error) {
        toast.error(response.error);
        setLoading(false);
        return;
      }
      
      toast.success(response.message);
      onOpenChange()
      setLoading(false);
      router.refresh();
      return;
    }

    const price = convertReal(formData.price);

    const data = {
      ...formData,
      price,
      tags,
    };

    const response = await createProduct(data);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("Produto criado com sucesso!");
    setLoading(false);
    form.reset();
    onOpenChange();
    router.refresh();
  }

  function handleAddTag(tag: string) {
    setTags((prev) => 
    prev.includes(tag) 
    ? prev.filter((t) => t !== tag) 
    : [...prev, tag]
    );
  }

  function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;
    value = value.replace(/\D/g, "");

    if (value) {
      value = (parseInt(value, 10) / 100).toFixed(2);
      value = value.replace(".", ",");
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    event.target.value = value;
    form.setValue("price", value);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold">
          Novo produto
        </DialogTitle>
        <DialogDescription className="text-sm text-gray-500 ">
          Adicione um novo produto
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do produto..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria..." />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="pizza">Pizza</SelectItem>
                        <SelectItem value="drink">Bebida</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {category === "pizza" && (
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Descrição do produto..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {category && (
            <div>
              <h2 className="text-sm font-semibold text-dark-normal">Tags</h2>
              <div className="flex w-full flex-wrap gap-2 mt-2">
                {productTags[category]?.map((tag) => {
                  const checked = tags.includes(tag);
                  return (
                    <Button
                      key={tag}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddTag(tag);
                      }}
                      className={`cursor-pointer text-sm p-2 shadow-md bg-white text-dark-normal hover:bg-gray-50 ${
                        checked &&
                        "bg-primary-normal text-white hover:bg-primary-dark"
                      } `}
                    >
                      {tag}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ex: 30,00 R$"
                    onChange={changeCurrency}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex items-center gap-1.5 space-y-0 justify-end">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="font-semibold leading-tight">
                  Destaque
                </FormLabel>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-primary-normal hover:bg-primary-dark duration-300 cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" color="#fff" />
            ): productId ? "Salvar" : "Criar novo produto"}
          </Button>
        </form>
      </Form>
    </>
  );
}
