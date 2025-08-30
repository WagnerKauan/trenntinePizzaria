"use client";

import Image from "next/image";
import { CardPizza } from "./cardPizza";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/generated/prisma";
import { useDispatch } from "react-redux";
import { addProduct } from "@/store/cart/cartSlice";

export function FeaturedPizzas({ products }: { products: Product[] }) {
  const featuredProducts = products.filter((product) => product.isFeatured);

  const dispatch = useDispatch();

  function handleAddToCart(product: Product) {
    dispatch(addProduct(product));
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="relative w-full h-[130px]">
        <Image
          src={"/image/bg_featuredPizza.png"}
          alt="Pizza"
          fill
          className="w-full object-cover"
          quality={100}
        />
        <div className="absolute bottom-4 left-0 w-full h-full flex items-center justify-center">
          <h2 className="text-white text-2xl xl:text-[34px] uppercase font-bold ">
            Mais pedidas
          </h2>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 -mt-10">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="space-y-6">
            {featuredProducts.map((product) => (
              <CarouselItem
                className="md:basis-1/2 lg:basis-1/3 pl-18 md:pl-11"
                key={product.id}
              >
                <CardPizza
                  product={product}
                  addToCard={handleAddToCart}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden cursor-pointer xl:flex bg-white/80 hover:bg-white 
            rounded-full shadow-md transition items-center justify-center w-10 h-10">
            <ChevronLeft className="h-5 w-5 text-dark-normal" />
          </CarouselPrevious>

          <CarouselNext className="hidden cursor-pointer xl:flex bg-white/80 hover:bg-white 
            rounded-full shadow-md transition items-center justify-center w-10 h-10">
            <ChevronRight className="h-5 w-5 text-dark-normal" />
          </CarouselNext>
        </Carousel>
      </div>
    </section>
  );
}
