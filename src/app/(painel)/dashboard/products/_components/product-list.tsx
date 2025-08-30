"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, SquarePen } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Prisma } from "@/generated/prisma";
import { DialogProduct } from "./dialog-product";
import { useEffect, useState } from "react";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import { Switch } from "@/components/ui/switch";
import { updateProductStatus } from "../_actions/update-product-status";
import { toast } from "sonner";
import { ProductAvatar } from "./product-avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

type Product = Prisma.ProductGetPayload<{}>;

interface ProductListProps {
  products: Product[];
}

export function ProductsList({ products }: ProductListProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [productsFiltered, setProductsFiltered] = useState<Product[]>(
    products || []
  );
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setProductsFiltered(products || []);  
  }, [products]);

  function handleEditProduct(product: Product) {
    setEditingProduct(product);
    setDialogOpen(true);
  }

  async function handleUpdateProductStatus(productId: string, active: boolean) {
    try {
      const updatedProducts = products?.map((product) => {
        if (product.id === productId) {
          return { ...product, active };
        }
        return product;
      });
      setProductsFiltered(updatedProducts || []);

      const response = await updateProductStatus(productId, active);

      toast.success(response.message);
    } catch (error) {
      toast.error("Erro ao atualizar o produto");
    }
  }

  function searchProducts(value: string) {
    setSearch(value);
    const filteredProducts = products?.filter((product) => {
      return product.name.toLowerCase().includes(value.toLowerCase());
    });
    setProductsFiltered(filteredProducts || []);
  }

  function selectedStatus(value: string) {
    const filteredProducts = products?.filter((product) => {
      switch (value) {
        case "all":
          return true;
        case "active":
          return product.active;
        case "inactive":
          return !product.active;
        case "drink":
          return product.category === "drink";
        case "pizza":
          return product.category === "pizza";
        default:
          return true;
      }
    });

    setProductsFiltered(filteredProducts || []);

    console.log(filteredProducts)
  }

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
        setEditingProduct(null);
      }}
    >
      <section className="mx-auto">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-dark-normal text-xl font-semibold">
              Produtos
            </CardTitle>

            <DialogTrigger asChild>
              <Button size={"icon"} className="cursor-pointer">
                <Plus className="w-5 h-5" color="#fff" />
              </Button>
            </DialogTrigger>

            <DialogContent
              onInteractOutside={() => {
                setDialogOpen(false);
                setEditingProduct(null);
              }}
            >
              <DialogProduct
                onOpenChange={() => {
                  setDialogOpen(false);
                  setEditingProduct(null);
                }}
                productId={editingProduct ? editingProduct.id : undefined}
                initialValues={
                  editingProduct
                    ? {
                        productId: editingProduct.id,
                        name: editingProduct.name,
                        category: editingProduct.category,
                        description: editingProduct.description || "",
                        price: editingProduct.price
                          .toFixed(2)
                          .replace(".", ","),
                        active: editingProduct.active,
                        tags: editingProduct.tags,
                        isFeatured: editingProduct.isFeatured,
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
                  type="search"
                  placeholder="Pesquisar produto..."
                  onChange={(e) => searchProducts(e.target.value)}
                  value={search}
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
                  <SelectItem value="drink">Bebidas</SelectItem>
                  <SelectItem value="pizza">Pizzas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ScrollArea className="h-[630px] rounded-xl border border-stone-300 mt-5 overflow-hidden">
              <ul className=" rounded-xl border border-stone-300 divide-y divide-stone-300 overflow-hidden">
                {productsFiltered.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-center justify-between px-5 py-4 hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 max-w-md w-full">
                      <ProductAvatar product={product} />
                      <div className="flex flex-col">
                        <h4 className="font-semibold text-base">
                          {product.name}
                        </h4>
                        <span className="text-sm text-stone-500">
                          {formatCurrency(product.price)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Button
                        size={"icon"}
                        className="cursor-pointer border-none bg-white"
                        variant={"outline"}
                        asChild
                        onClick={() => handleEditProduct(product)}
                      >
                        <SquarePen className="w-5 h-5" />
                      </Button>
                      <Switch
                        checked={product.active}
                        onCheckedChange={(active) =>
                          handleUpdateProductStatus(product.id, active)
                        }
                        className="cursor-pointer"
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
