"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil } from "lucide-react";

export function CardOrder() {
  return (
    <article className="w-full max-w-[340px] rounded-2xl shadow-lg border 
        border-gray-200 bg-white p-5 space-y-4 transition hover:shadow-xl">
      {/* Header com ID e status */}
      <div className="flex items-center justify-between">
        <span className="font-bold text-lg text-gray-800">Pedido #123</span>
        <Select defaultValue="waiting">
          <SelectTrigger className="w-[140px] h-9 text-sm rounded-lg border-gray-300">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="waiting">Aguardando</SelectItem>
            <SelectItem value="preparing">Em preparo</SelectItem>
            <SelectItem value="on-the-way">A caminho</SelectItem>
            <SelectItem value="delivered">Finalizado</SelectItem>
            <SelectItem value="canceled">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cliente */}
      <div className="space-y-1">
        <h4 className="font-semibold text-gray-700">João da Silva</h4>
        <div className="flex items-center justify-between">
          <div className="flex flex-col text-sm text-gray-500">
            <span>Rua Centro, 123</span>
            <span>(11) 99999-9999</span>
          </div>
          <Button
            size={"icon"}
            variant={"outline"}
            className="cursor-pointer border-none"
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Itens */}
      <div className="space-y-2">
        <h4 className="font-semibold text-gray-700">Itens</h4>
        <ul className="space-y-2 pl-4 list-disc text-sm text-gray-600">
          <li className="flex items-center justify-between">
            <span>1x Pizza de Calabresa</span>
            <span className="font-medium text-gray-800">R$ 45,00</span>
          </li>
          <li className="flex items-center justify-between">
            <span>1x Pizza de Frango</span>
            <span className="font-medium text-gray-800">R$ 42,00</span>
          </li>
        </ul>
      </div>

      <hr className="border-gray-200" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-gray-800">Total</h4>
        <span className="text-lg font-bold text-green-600">R$ 87,00</span>
      </div>
    </article>
  );
}
