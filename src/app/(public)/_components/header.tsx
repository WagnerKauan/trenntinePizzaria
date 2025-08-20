"use client";

import { Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function Header() {
  const sections = [
    { href: "#home", label: "Home" },
    { href: "#promocoes", label: "Promoções" },
    { href: "#cardapio", label: "Cardápio" },
    { href: "#localizacao", label: "Localização" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[300] bg-white shadow-md">
      <header className="flex items-center
        justify-between px-4 py-6 container mx-auto">
        <Sheet>
          <div className="w-[111px] h-[48px] relative">
            <Image
              src={"/image/logoTrentine 1.png"}
              alt="Logo da trentine"
              className="w-full object-cover"
              fill
              quality={100}
              priority
            />
          </div>
          <nav className="hidden md:flex items-center gap-7.5">
            {sections.map((section) => (
              <SideBarLink
                key={section.href}
                href={section.href}
                label={section.label}
              />
            ))}
          </nav>
          <div className="flex items-center gap-7.5 flex-1 justify-end
            md:justify-items-start mr-7.5 md:mr-0 md:flex-initial">
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 left-4 w-4 h-4 bg-primary-normal rounded-full flex
                items-center justify-center text-[10px] text-white">
                3
              </span>
            </div>
            <Button
              className="hidden cursor-pointer md:flex bg-primary-normal
               hover:bg-primary-dark duration-300 px-8 py-5"
            >
              Pedir agora
            </Button>
          </div>
          {/* sidebar Mobile */}
          <div className="md:hidden flex items-center gap-10">
            <div className="relative md:hidden">
              <SheetTrigger asChild>
                <Menu className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent side="left" className="max-w-[230px] z-[300]">
                <SheetHeader>
                  <SheetTitle>
                    <div className="w-[111px] h-[48px] relative">
                      <Image
                        src={"/image/logoTrentine 1.png"}
                        alt="Logo da trentine"
                        className="w-full object-cover"
                        fill
                        quality={100}
                        priority
                      />
                    </div>
                  </SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-7 px-5">
                  {sections.map((section) => (
                    <SideBarLink
                      key={section.href}
                      href={section.href}
                      label={section.label}
                    />
                  ))}
                </nav>
              </SheetContent>
            </div>
          </div>
        </Sheet>
      </header>
    </div>
  );
}

interface SideBarLinkProps {
  href: string;
  label: string;
}

export function SideBarLink({ href, label }: SideBarLinkProps) {
  return (
    <a
      href={href}
      className="text-dark-normal hover:text-primary-normal duration-200 font-bold"
    >
      {label}
    </a>
  );
}
