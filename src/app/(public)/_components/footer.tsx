"use client";

import Image from "next/image";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary-normal">
      <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between gap-10 py-10">

        <div className="flex flex-col items-center gap-5 ">
          <div className="relative max-w-[140px] h-[53px]">
            <Image
              src={"/image/logoTrentinne_light.png"}
              alt="Logo Trentinne"
              width={140}
              height={53}
              className="w-full object-cover"
            />
          </div>

          <p className="text-center  text-white max-w-[300px]">
            A gente faz pizza com alma de casa italiana: massa leve,
            ingredientes frescos e muito carinho em cada fatia. Aqui o sabor é
            tradição.
          </p>
        </div>

        <div className="flex flex-col items-center gap-5  flex-1">
          <h4 className="text-white text-2xl font-bold">Nossas redes</h4>
          <div className="flex items-center text-white gap-2.5">
            <Twitter
              className="cursor-pointer hover:scale-105 duration-300"
              size={24}
            />
            <Instagram
              className="cursor-pointer hover:scale-105 duration-300"
              size={24}
            />
            <Facebook
              className="cursor-pointer hover:scale-105 duration-300"
              size={24}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 ">
          <h4 className="text-white text-2xl font-bold">
            Métodos de pagamento
          </h4>
          <div className="flex items-center gap-2.5">
            <Image
              src={"/image/methodPayments/Visa.png"}
              alt="Visa"
              width={34}
              height={34}
              className="w-full object-cover"
            />
            <Image
              src={"/image/methodPayments/DiscoverCard.png"}
              alt="DiscoverCard"
              width={34}
              height={34}
              className="w-full object-cover"
            />

            <Image
              src={"/image/methodPayments/Paypal.png"}
              alt="Paypal"
              width={34}
              height={34}
              className="w-full object-cover"
            />

            <Image
              src={"/image/methodPayments/Pix.png"}
              alt="Pix"
              width={34}
              height={34}
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="text-base bg-dark-normal text-white py-1 text-center">
        {" "}
        &copy; Copyright trentinne - Todos diretos reservados
      </div>
    </footer>
  );
}
