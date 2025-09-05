"use client";

import { Product } from "@/generated/prisma";
import { selectCartItemQuantity } from "@/store/cart/cartSelectors";
import Image from "next/image";
import { useSelector } from "react-redux";

interface CardMenuItemProps {
  product: Product;
  addToCard: (pizza: Product) => void;
}

export function CardMenuItem({ product, addToCard }: CardMenuItemProps) {
  const quantity = useSelector(selectCartItemQuantity(product.id));

  return (
    <button
      className="flex items-center justify-between relative shadow-md border text-left border-gray-200 
    hover:border-primary-normal rounded-xl px-4 py-3 hover:shadow-lg hover:scale-[1.02] cursor-pointer duration-300"
      onClick={() => addToCard(product)}
    >
      <div className="flex flex-col gap-2 max-w-[250px]">
        <h3 className="text-base font-bold text-dark-800">{product.name}</h3>

        <p className="text-sm text-dark-800 line-clamp-2">
          {product.description}
        </p>

        {product.promotionalPrice && (
          <div className="flex items-center gap-1.5">
            <span className="text-dark-800 text-base line-through">
              R$ {product.price.toFixed(2).toString().replace(".", ",")}
            </span>
            <span className="text-primary-normal font-bold text-lg">
              R$ {product.promotionalPrice.toFixed(2).toString().replace(".", ",")}
            </span>
          </div>
        )}


        {!product.promotionalPrice && (
          <span className="text-primary-normal font-bold text-lg">
            R$ {product.price.toFixed(2).toString().replace(".", ",")}
          </span>
        )}
      </div>
      <div className="relative rounded-xl overflow-hidden w-[120px] h-[90px]">
        <Image
          src={product.imageUrl || "/images/pizza-calabresa.png"}
          alt="Pizza Calabresa"
          fill
          className="object-cover"
        />
      </div>

      {quantity > 0 && (
        <span className="absolute top-2 right-2 bg-primary-normal text-white rounded-full 
          w-6 h-6 flex items-center justify-center">
          {quantity}
        </span>
      )}
    </button>
  );
}
