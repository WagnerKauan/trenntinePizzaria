"use client";

import Link from 'next/link'
import {  ShoppingCartIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CardItem } from "./card-item";
import { Button } from "./button";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "@/store/cart/cartSlice";
import {
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
} from "@/store/cart/cartSelectors";

export function ShoppingCart() {
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalPrice = useSelector(selectCartTotalPrice);
  const dispatch = useDispatch();


  function handleIncrementQuantity(id: string) {
    dispatch(incrementQuantity(id));
  }

  function handleDecrementQuantity(id: string) {
    dispatch(decrementQuantity(id));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="relative p-2 rounded-md hover:bg-gray-100 transition cursor-pointer">
          <ShoppingCartIcon className="w-6 h-6 text-gray-800" />

          {cartItems?.length > 0 && (
            <span
              className="absolute -top-1 -right-1 w-5 h-5 bg-primary-normal 
              rounded-full flex items-center justify-center 
              text-xs text-white font-semibold shadow-md"
            >
              {totalQuantity}
            </span>
          )}
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="font-semibold text-lg lg:text-xl">
            Meu carrinho
          </DialogTitle>
          <DialogDescription>
            {cartItems?.length > 0
              ? `Você tem ${totalQuantity} pizza(s) no carrinho`
              : "Seu carrinho está vazio"}
          </DialogDescription>
        </DialogHeader>

        {cartItems.length > 0 && (
          <ScrollArea className="p-4 h-[300px] ">
            <div className="flex flex-col gap-4">
              {cartItems?.map((product, index) => (
                <CardItem
                  key={index}
                  imageUrl={product.imageUrl}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                  id={product.id}
                  incrementQuantity={handleIncrementQuantity}
                  decrementQuantity={handleDecrementQuantity}
                />
              ))}
            </div>
          </ScrollArea>
        )}

        <div className="flex items-center justify-between">
          <span className="font-bold text-dark-normal uppercase text-base lg:text-lg">total</span>
          <span className="font-bold text-dark-normal text-base lg:text-lg">
            R$ {totalPrice.toFixed(2).toString().replace(".", ",")}
          </span>
        </div>

        <Button
          className="w-full mt-4 bg-primary-normal hover:bg-primary-dark cursor-pointer"
          disabled={cartItems?.length === 0}
          
        >
          <Link href="/checkout">Finalizar compra</Link>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
