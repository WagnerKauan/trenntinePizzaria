"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { CardPromotions } from "./cardPromotions";
import { Promotion } from "@/utils/get-all-promotions";

export function Promotions({ promotions }: { promotions: Promotion[] }) {
  return (
    <section id="promocoes" className="py-16 lg:py-24">
      <div className="relative w-full h-[130px]">
        <Image
          src={"/image/bg_promotionsPizza.png"}
          alt="Pizza"
          fill
          className="w-full object-cover"
          quality={100}
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h2 className="text-white text-2xl xl:text-[34px] uppercase font-bold ">
            Promoções
          </h2>
        </div>
      </div>

      <article className="bg-secondary-light py-10">
        <div className="container mx-auto max-w-7xl">
          <div className="hidden lg:grid grid-cols-3 gap-10 xl:gap-20 p-6 xl:px-10">
            {promotions.map((promotion) => (
              <CardPromotions key={promotion.id} promotion={promotion} />
            ))}
          </div>

          {/* MOBILE PROMOTIONS */}
          <div className="block lg:hidden p-6">
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              plugins={[Autoplay({ delay: 4000 })]}
            >
              <CarouselContent className="space-y-6">
                {promotions.map((promotion) => (
                  <CarouselItem
                    key={promotion.id}
                    className="pl-14 md:basis-1/2"
                  >
                    <CardPromotions promotion={promotion} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </article>
    </section>
  );
}
