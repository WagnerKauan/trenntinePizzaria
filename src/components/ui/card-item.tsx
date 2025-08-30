"use client";

import { Minus, Plus } from "lucide-react";
import Image from "next/image";


type CartItemProps = {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
};

export function CardItem({ name, price, imageUrl, quantity, id,  incrementQuantity, decrementQuantity }: CartItemProps) {

  return (
    <div className="w-full shadow-md border border-gray-200 rounded-xl p-4 flex items-center justify-between bg-white">
      <div className="flex items-center gap-3">
        <div className="relative rounded-full overflow-hidden w-[50px] h-[50px]">
          <Image
            src={imageUrl || "/images/pizza-calabresa.png"}
            alt="Pizza Marguerita"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-gray-800 lg:text-base">{name}</h3>
          <span className="text-xs text-primary-normal lg:text-base">R$ {price.toFixed(2).toString().replace(".", ",")}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="cursor-pointer w-6 h-6 flex items-center justify-center rounded-full
            border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          onClick={() => decrementQuantity(id)}
        >
          <Minus className="w-3 h-3" />
        </button>

        <span className="text-sm font-medium text-gray-800 lg:text-base">{quantity}</span>
        <button
          className="cursor-pointer w-6 h-6 flex items-center
            justify-center rounded-full bg-primary-normal text-white hover:bg-primary-dark transition"
          onClick={() => incrementQuantity(id)}
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
