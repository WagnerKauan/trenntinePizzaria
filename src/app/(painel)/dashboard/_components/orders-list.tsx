"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { CardOrder } from "./card-order";

export function OrdersList() {
  return (
    <section className="mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-dark-normal text-xl font-semibold">
            Pedidos
          </CardTitle>
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
                className="pl-10 w-full flex-1 focus-visible:ring-2 focus-visible:ring-primary 
                    focus-visible:ring-offset-1 focus-visible:border-transparent"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full max-w-[150px] xl:max-w-xs">
                <SelectValue placeholder="Filtrar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="waiting">Aguardando</SelectItem>
                <SelectItem value="preparing">Em preparo</SelectItem>
                <SelectItem value="on-the-way">A caminho</SelectItem>
                <SelectItem value="delivered">Finalizado</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <section className="mt-10">
            <CardOrder />
          </section>
        </CardContent>
      </Card>
    </section>
  );
}
