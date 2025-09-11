"use client";

import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";
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
import {
  incrementQuantity,
  decrementQuantity,
  setActivePromotion,
  CartItem,
  clearPromotion,
  removePromotion,
} from "@/store/cart/cartSlice";
import {
  selectCartItems,
  selectCartPromotion,
  selectCartTotalPrice,
  selectCartTotalQuantity,
} from "@/store/cart/cartSelectors";
import { selectPromotions } from "@/store/promotions/promotionsSeletors";
import {
  ParsedPromo,
  parsePromotions,
} from "@/utils/promotions/perse-promotion";
import { useEffect, useState } from "react";
import { checkValidPromotion } from "@/utils/promotions/check-valid-promotion";

export function ShoppingCart({ statusPizzaria }: { statusPizzaria: boolean }) {
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalPrice = Math.ceil(useSelector(selectCartTotalPrice));
  const promotions = useSelector(selectPromotions);
  const activePromotion = useSelector(selectCartPromotion);
  const [parsedPromotions, setParsedPromotions] = useState<ParsedPromo[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const parsedPromotions = parsePromotions(promotions);
    setParsedPromotions(parsedPromotions);
  }, [promotions]);

  useEffect(() => {
    checkActivepromotions();
  }, [cartItems, totalQuantity, parsedPromotions]);

  function handleIncrementQuantity(id: string) {
    dispatch(incrementQuantity(id));
  }

  function handleDecrementQuantity(id: string) {
    dispatch(decrementQuantity(id));
  }

  function checkActivepromotions() {
    if (parsedPromotions.length === 0) {
      dispatch(clearPromotion());
      return;
    }

    if (cartItems.length === 0) {
      dispatch(clearPromotion());
      return;
    }

    let foundValidPromotion = false;
    let promotionsActive: {
      id: string;
      name: string;
      discount?: number;
      bonusProduct?: string;
    }[] = [];

    for (const promo of parsedPromotions) {
      if (!promo.rule.minQuantity) {
        continue;
      }

      if (checkValidPromotion(promo, cartItems, totalQuantity)) {
        foundValidPromotion = true;
        promotionsActive.push({
          id: promo.id,
          name: promo.name,
          discount: promo.rule.discount,
          bonusProduct: promo.rule.bonusProduct,
        });
      } else {
        dispatch(removePromotion(promo));
      }
    }

    if (!foundValidPromotion) {
      dispatch(clearPromotion());
      return;
    }

    if (promotionsActive.length > 0) {
      dispatch(setActivePromotion(promotionsActive));
    }
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
          <ScrollArea className="p-4 h-[230px] ">
            <div className="flex flex-col gap-4">
              {cartItems?.map((product, index) => (
                <CardItem
                  key={index}
                  imageUrl={product.imageUrl}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                  pricePromotion={product.promotionalPrice}
                  id={product.id}
                  incrementQuantity={handleIncrementQuantity}
                  decrementQuantity={handleDecrementQuantity}
                />
              ))}
            </div>
          </ScrollArea>
        )}

        <div className="space-y-2 mt-4">
          {activePromotion &&
            activePromotion.length > 0 &&
            activePromotion.map((promotion) => (
              <div
                key={promotion.id}
                className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-3 py-2 shadow-sm"
              >
                <span className="text-sm font-medium text-green-800">
                  🎉 {promotion.name}
                </span>

                {promotion.discount && (
                  <span className="text-sm font-semibold text-green-700">
                    - {promotion.discount}%
                  </span>
                )}

                {promotion.bonusProduct && (
                  <span className="text-sm font-semibold text-green-700">
                    + {promotion.bonusProduct}
                  </span>
                )}
              </div>
            ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="font-bold text-dark-normal uppercase text-base lg:text-lg">
            total
          </span>
          <span className="font-bold text-dark-normal text-base lg:text-lg">
            R$ {totalPrice.toFixed(2).toString().replace(".", ",")}
          </span>
        </div>

        {statusPizzaria && (
          <Button
            disabled={totalQuantity === 0}
            className={`w-full mt-4 bg-primary-normal hover:bg-primary-dark cursor-pointer ${
              totalQuantity === 0 ? "opacity-50 pointer-events-none" : ""
            }`}
            asChild
          >
            <Link href="/checkout">Finalizar compra</Link>
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
