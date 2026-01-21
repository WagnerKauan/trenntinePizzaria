"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Promotion } from "@/generated/prisma";
import Link from "next/link";

export function CardPromotions({ promotion }: { promotion: Promotion }) {
  return (
    <div
      className="relative w-[300px] h-[300px] lg:w-full lg:aspect-square rounded-xl shadow-lg 
            overflow-hidden group hover:shadow-xl transition-all duration-500 "
    >
      <Image
        src={promotion.imageUrl || "/image/pizzaCalabresa.png"}
        fill
        alt={promotion.name}
        className="w-full object-cover group-hover:scale-105 duration-300"
      />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-between p-6 bg-black/70">
        <div className="flex flex-col gap-4">
          <h5 className="text-secondary-normal font-extrabold text-xl drop-shadow-md">
            {promotion.name}
          </h5>
          <span className="text-gray-200 line-clamp-2 text-sm drop-shadow max-w-[200px]">
            {promotion.description}
          </span>
          <span className="text-white px-3 py-1 bg-secondary-normal rounded-lg font-bold text-base w-fit shadow">
            {promotion.type === "PERCENT" ? "Desconto" : "Combo"}
          </span>
        </div>
        <Button
          className="bg-transparent border-2 border-secondary-normal hover:bg-secondary-normal 
              text-secondary-light cursor-pointer px-10 py-3 hover:text-white duration-300"
        >
          <Link href="/menu">Cardapío</Link>
        </Button>
      </div>
    </div>
  );
}
