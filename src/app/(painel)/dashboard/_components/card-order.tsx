"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order, Product } from "@/generated/prisma";
import { formatCurrency } from "@/utils/formatCurrency";
import { Pencil } from "lucide-react";
import { DialogOrder } from "./dialog-order";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface CartItemProps {
  order: Order;
  handleUpdateStatus: (id: string, status: string) => void
}

export function CardOrder({ order, handleUpdateStatus }: CartItemProps) {
  const items: Product[] = Array.isArray(order.items)
    ? (order.items as unknown as Product[])
    : [];

  const date = new Date(order.createdAt).toLocaleString("pt-BR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

   const statusOrder: Record<string, string> = {
    "PENDING": "text-yellow-500",
    "PREPARATION": "text-blue-500",
    "CONCLUDED": "text-green-500",
    "CANCELED": "text-red-500",
  }

  return (
    <article
      className="rounded-2xl shadow-lg border
          border-gray-200 bg-white p-5 space-y-4 transition hover:shadow-xl flex flex-col justify-between"
    >
      <div className="flex items-center justify-between">
        <span className="font-bold text-base xl:text-lg text-gray-800">
          {date}
        </span>
        <Select defaultValue={order.status} onValueChange={(value) => handleUpdateStatus(order.id, value)}>
          <SelectTrigger className={`w-[140px] h-9 text-sm rounded-lg border-gray-300 ${statusOrder[order.status]}`}>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PENDING">Aguardando</SelectItem>
            <SelectItem value="PREPARATION">Em preparo</SelectItem>
            <SelectItem value="CONCLUDED">Finalizado</SelectItem>
            <SelectItem value="CANCELED">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <h4 className="font-semibold text-gray-700">{order.name}</h4>
        <div className="flex items-center justify-between">
          <div className="flex flex-col text-sm text-gray-500">
            <span>{order.street}</span>
            <span>{order.phone}</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size={"icon"}
                variant={"outline"}
                className="cursor-pointer border-none"
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </DialogTrigger>

            <DialogOrder order={order} />
          </Dialog>
        </div>
      </div>
      <hr className="border-gray-200" />
      <div className="space-y-2">
        <h4 className="font-semibold text-gray-700">Itens ({items.length})</h4>
        <ScrollArea className="h-[50px] overflow-auto px-2">
          <ul className="space-y-2 pl-4 text-sm text-gray-600">
            {items?.map((item) => (
              <li key={item.id} className="flex items-center justify-between">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span className="font-medium text-gray-800">
                  {formatCurrency(item.price)}
                </span>
              </li>
            ))}
            
            {order.bonusProducts?.map((item, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>
                  1x {item}
                </span>
                <span className="font-medium text-gray-800">
                  gratuito
                </span>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
      <hr className="border-gray-200" />
      <div>
        <h4 className="font-semibold text-gray-700">Promoções</h4>
        {order.appliedPromotionName && order.appliedPromotionName.split(",").map((promotion, index) => (
          <p key={index} className="text-sm text-gray-600">{promotion}</p>
        ))}

        {!order.appliedPromotionName && <p className="text-sm text-gray-600">Nenhuma promocão aplicada</p>}
      </div>
      <hr className="border-gray-200" />
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-gray-800">Total</h4>
        <span className="text-lg font-bold text-green-600">
          {formatCurrency(order.total)}
        </span>
      </div>
    </article>
  );
}
