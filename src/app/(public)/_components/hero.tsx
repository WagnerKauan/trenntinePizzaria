"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="container mx-auto py-24 mt-22">
      <main className="flex items-center justify-between">
        <article className="space-y-8 px-3.5 lg:max-w-[450px] xl:max-w-none max-w-[550px] mx-auto lg:mx-0">
          <h1
            className="text-dark-800 font-bold text-2xl text-center 
            md:text-4xl lg:text-left lg:text-3xl lg:max-w-2xl xl:max-w-3xl xl:text-5xl "
          >
            A pizza que sua família ama, do jeitinho certo.
          </h1>

          <p className="text-dark-normal text-center md:text-lg lg:text-left lg:text-xl lg:max-w-2xl">
            Na Trentinne Pizzaria, cada fatia é feita pra unir sorrisos. Escolha
            sua favorita e peça agora pelo WhatsApp — simples, rápido e
            saboroso.
          </p>

          <div className="w-full flex justify-center lg:justify-start pt-7">
            <Button
              className="cursor-pointer md:flex bg-primary-normal
               hover:bg-primary-dark duration-300 px-14 text-[18px] py-6 rounded-full lg:w-full lg:max-w-2xs"
            >
              Pedir agora
            </Button>
          </div>
        </article>

        <div className="hidden lg:block relative w-[450px] h-[450px] 2xl:w-[550px] 2xl:h-[550px]">
          <Image
            src={"/image/heroImg.png"}
            alt="Pizza"
            fill
            className="w-full object-cover"
            quality={100}
          />
        </div>
      </main>
    </section>
  );
}
