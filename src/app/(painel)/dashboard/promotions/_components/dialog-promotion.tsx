"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PromotionFormValues, usePromotionForm } from "./promotion-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createPromotion } from "../_actions/create-promotion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { updatePromotion } from "../_actions/update-promotion";

interface DialogPromotionProps {
  promotionId?: string;
  initialValues?: PromotionFormValues;
  setOpen: (open: boolean) => void;
}

export function DialogPromotion( { setOpen,initialValues, promotionId }: DialogPromotionProps ) {
  const [tags, setTags] = useState<string[]>(initialValues?.tags || []);
  const form = usePromotionForm({initialValues});
  const category = form.watch("category");
  const typePromo = form.watch("type");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  function handleAddTag(tag: string) {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  async function onSubmit(formData: PromotionFormValues) {
    setLoading(true);
    
    const data = {
      ...formData,
      minQuantity: Number(formData.minQuantity),
      discount: Number(formData.discount),
      tags,
    };


    if(promotionId) {
      const response = await updatePromotion({
        ...data,
        id: promotionId
      });
      if (response.error) {
        toast.error(response.error);
        return;
      }
      router.refresh();
      toast.success(response.message);
      form.reset();
      setOpen(false);
      setLoading(false);
      return
    }

    const response = await createPromotion(data);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    router.refresh();
    toast.success(response.message);
    form.reset();
    setOpen(false);
  }


  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold">
          {initialValues ? "Editar promoção" : "Nova promoção"}
        </DialogTitle>
        <DialogDescription className="text-sm text-gray-500 ">
          {initialValues
            ? "Edite as informações da promoção"
            : "Crie uma nova promoção"}
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Promoção sexta feira..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PERCENT">Desconto</SelectItem>
                        <SelectItem value="COMBO">Combo</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder="descrição da promoção..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between gap-4">
            {typePromo === "COMBO" && (
              <FormField
                control={form.control}
                name="bonusProduct"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Produto bônus</FormLabel>
                    <FormControl>
                      <Input  placeholder="Ex: coca-cola 2L..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {typePromo === "PERCENT" && (
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Desconto %</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ex: 10%" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="minQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade minima</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ex: 2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
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

          {category && (
            <div>
              <h2 className="text-sm font-semibold text-dark-normal">Tags</h2>
              <span className="text-xs text-gray-800">
                Selecionar uma tag limita a promoção a produtos dessa tag.
              </span>
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

          <Button
            className="w-full cursor-pointer bg-primary-normal hover:bg-primary-dark duration-300"
            type="submit"
            disabled={loading}
          >
            {loading ? <Loader className="w-5 h-5 animate-spin" /> : initialValues ? "Editar" : "Salvar"}
          </Button>
        </form>
      </Form>
    </>
  );
}
