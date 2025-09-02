"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";
import { Plus, Search, SquarePen } from "lucide-react";
import { DialogPromotion } from "./dialog-promotion";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Promotion } from "@/generated/prisma";
import { Switch } from "@/components/ui/switch";
import { PromotionAvatar } from "./promotion-avatar";
import { PromotionRule } from "@/types";
import { PromotionFormValues } from "./promotion-form";
import { updatePromotionStatus } from "../_actions/update-promotion-status";
import { toast } from "sonner";

interface PromotionsListProps {
  promotions: Promotion[];
}

export type PromotionValues = PromotionFormValues & { id: string };

export function PromotionsList({ promotions }: PromotionsListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filteredPromotions, setFilteredPromotions] = useState<
    Promotion[] | []
  >(promotions || []);

  const [editingPromotion, setEditingPromotion] =
    useState<PromotionValues | null>(null);

  useEffect(() => {
    setFilteredPromotions(
      promotions.sort((a, b) => a.name.localeCompare(b.name)) || []
    );
  }, [promotions]);

  function handleEditProduct(promotion: Promotion) {
    let rules: PromotionRule = {};

    try {
      if (promotion.rules && typeof promotion.rules === "object") {
        rules = promotion.rules as PromotionRule;
      } else if (typeof promotion.rules === "string") {
        rules = JSON.parse(promotion.rules) as PromotionRule;
      }
    } catch (error) {
      console.error("Erro ao parsear rules", error);
    }

    const data = {
      id: promotion.id,
      name: promotion.name,
      description: promotion.description,
      type: promotion.type as "PERCENT" | "COMBO",
      active: promotion.active,
      imageUrl: promotion.imageUrl ?? undefined,
      category: rules.category!,
      tags: rules.tags!,
      bonusProduct: rules.bonusProduct,
      discount: String(rules.discount),
      minQuantity: String(rules.minQuantity),
    };

    setEditingPromotion(data);
    setIsDialogOpen(true);
  }

  function handleSearch(query: string) {
    setFilteredPromotions(
      promotions.filter((promotion) =>
        promotion.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }

  function selectedStatus(value: string) {
    switch (value) {
      case "all":
        setFilteredPromotions(promotions);
        break;
      case "active":
        setFilteredPromotions(
          promotions.filter((promotion) => promotion.active)
        );
        break;
      case "inactive":
        setFilteredPromotions(
          promotions.filter((promotion) => !promotion.active)
        );
        break;

      case "PERCENT":
        setFilteredPromotions(
          promotions.filter((promotion) => promotion.type === "PERCENT")
        );
        break;
      case "COMBO":
        setFilteredPromotions(
          promotions.filter((promotion) => promotion.type === "COMBO")
        );

        break;
      default:
        setFilteredPromotions(promotions);
        break;
    }
  }

  async function handleUpdateProductStatus(productId: string, active: boolean) {
    const updatedPromotions = promotions?.map((promotion) => {
      if (promotion.id === productId) {
        return { ...promotion, active };
      }
      return promotion;
    });
    setFilteredPromotions(updatedPromotions || []);

    const response = await updatePromotionStatus(productId, active);

    if (response.error) toast.error(response.error);

    toast.success(response.message);
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open);
        setEditingPromotion(null);
      }}
    >
      <section className="mx-auto">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-dark-normal text-xl font-semibold">
              Promoções
            </CardTitle>

            <DialogTrigger asChild>
              <Button size={"icon"} className="cursor-pointer">
                <Plus className="w-5 h-5" color="#fff" />
              </Button>
            </DialogTrigger>

            <DialogContent
              onInteractOutside={() => {
                setIsDialogOpen(false);
                setEditingPromotion(null);
              }}
            >
              <DialogPromotion
                setOpen={() => {
                  setIsDialogOpen(false);
                  setEditingPromotion(null);
                }}
                promotionId={editingPromotion?.id}
                initialValues={
                  editingPromotion
                    ? {
                        name: editingPromotion.name,
                        description: editingPromotion.description,
                        type: editingPromotion.type,
                        active: editingPromotion.active,
                        imageUrl: editingPromotion.imageUrl,
                        category: editingPromotion.category,
                        tags: editingPromotion.tags,
                        bonusProduct: editingPromotion.bonusProduct,
                        discount: editingPromotion.discount,
                        minQuantity: editingPromotion.minQuantity,
                      }
                    : undefined
                }
              />
            </DialogContent>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-3 sm:gap-10 flex-wrap">
              <div className="relative w-full flex-1">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <Input
                  onChange={(e) => handleSearch(e.target.value)}
                  type="search"
                  placeholder="Pesquisar promoção..."
                  className="pl-10 w-full flex-1 focus-visible:ring-2 focus-visible:ring-primary
                      focus-visible:ring-offset-1 focus-visible:border-transparent"
                />
              </div>
              <Select
                defaultValue="all"
                onValueChange={(value) => selectedStatus(value)}
              >
                <SelectTrigger className="w-full max-w-[150px] xl:max-w-xs">
                  <SelectValue placeholder="Filtrar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Ativos</SelectItem>
                  <SelectItem value="inactive">Inativos</SelectItem>
                  <SelectItem value="COMBO">Combo</SelectItem>
                  <SelectItem value="PERCENT">Desconto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ScrollArea className="h-[630px] rounded-xl mt-5 overflow-hidden">
              <ul className="rounded-xl border border-stone-300 divide-y divide-stone-300 overflow-hidden">
                {filteredPromotions.length === 0 && (
                  <li className="flex items-center justify-center py-4">
                    <span className="text-sm text-stone-500">
                      Nenhuma promoção encontrada
                    </span>
                  </li>
                )}

                {filteredPromotions.map((promotion) => (
                  <li
                    key={promotion.id}
                    className="flex items-center justify-between px-5 py-4 hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 max-w-md w-full">
                      <PromotionAvatar promotion={promotion} />
                      <div className="flex flex-col">
                        <h4 className="font-semibold text-base">
                          {promotion.name}
                        </h4>
                        <span className="text-sm text-stone-500">
                          {promotion.type === "PERCENT" ? "Desconto" : "Combo"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Button
                        size={"icon"}
                        className="cursor-pointer border-none bg-white"
                        variant={"outline"}
                        asChild
                        onClick={() => handleEditProduct(promotion)}
                      >
                        <SquarePen className="w-5 h-5" />
                      </Button>
                      <Switch
                        className="cursor-pointer"
                        checked={promotion.active}
                        onCheckedChange={(value) =>
                          handleUpdateProductStatus(promotion.id, value)
                        }
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      </section>
    </Dialog>
  );
}
