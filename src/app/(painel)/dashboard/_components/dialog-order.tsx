"use client";

import { DialogHeader } from "@/components/ui/dialog";
import { Order, Product } from "@/generated/prisma";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatCurrency";

export function DialogOrder({ order }: { order: Order }) {
  const items: Product[] = Array.isArray(order.items)
    ? (order.items as unknown as Product[])
    : [];

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Detalhes do pedido</DialogTitle>
      </DialogHeader>

      <div className="space-y-4 mt-2 text-sm text-gray-700">

        <div>
          <h4 className="font-semibold">Cliente</h4>
          <p>{order.name}</p>
          <p>{order.phone}</p>
          {order.email && <p>{order.email}</p>}
          <p>
            {order.street}, {order.number}{" "}
            {order.complement && `- ${order.complement}`}
          </p>
          <p>{order.neighborhood}</p>
          <p>Ponto de referência: {order.referencePoint}</p>
          <p>CEP: {order.cep}</p>
        </div>

        <div>
          <h4 className="font-semibold">Itens</h4>
          <ul className="list-disc pl-5 space-y-1">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span>{formatCurrency(item.price)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Pagamento</h4>
          <p>Método: {order.methodPayment}</p>
          {order.changeFor && (
            <p>Troco para: {formatCurrency(Number(order.changeFor))}</p>
          )}
          <p>
            Total:{" "}
            <span className="font-bold text-green-600">
              {formatCurrency(order.total)}
            </span>
          </p>
        </div>

        {order.notes && (
          <div>
            <h4 className="font-semibold">Observações</h4>
            <p>{order.notes}</p>
          </div>
        )}

        {order.appliedPromotionName && (
          <div>
            <h4 className="font-semibold">Promoção aplicada</h4>
            <p>{order.appliedPromotionName}</p>
          </div>
        )}
      </div>

      {/* Botão de fechar */}
      <div className="mt-4 flex justify-end">
        <DialogClose asChild>
          <Button variant="outline" className="cursor-pointer">Fechar</Button>
        </DialogClose>
      </div>
    </DialogContent>
  );
}
