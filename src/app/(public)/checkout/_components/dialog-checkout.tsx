"use client";

import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

export function DialogCheckout({  onClose }: { onClose: () => void }) {
  return (
    <div>
      <DialogHeader className="flex flex-col items-center text-center space-y-3">
        <CheckCircle2 className="w-12 h-12 text-green-500" />
        <DialogTitle className="text-xl font-semibold">
          Pedido enviado com sucesso!
        </DialogTitle>
        <DialogDescription className="text-muted-foreground">
          Seu pedido foi enviado e em breve será entregue. Confirme os
          detalhes no WhatsApp.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="flex justify-center">
        <Button onClick={onClose} className="w-full sm:w-auto mt-2 cursor-pointer">
          Voltar
        </Button>
      </DialogFooter>
    </div>
  );
}
