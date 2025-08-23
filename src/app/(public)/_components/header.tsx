"use client";

import { Menu } from "lucide-react";
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
import { ShoppingCart } from "@/components/ui/shoppingCart";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const sections = [
  { href: "#", label: "Home" },
  { href: "#promocoes", label: "Promoções" },
  { href: "/menu", label: "Cardápio" },
  { href: "#localizacao", label: "Localização" },
];

export function Header() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <div className={`fixed top-0 left-0 right-0 z-10  bg-white shadow-md ${pathname === "/checkout" && "opacity-95"}`}>
      <header
        className="flex items-center
        justify-between px-4 py-6 container mx-auto"
        id="home"
      >
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
          <div
            className="flex items-center gap-7.5 flex-1 justify-end
            md:justify-items-start mr-7.5 md:mr-0 md:flex-initial"
          >
            <ShoppingCart />

            {pathname === "/menu" ? (
              <Button
              className="hidden cursor-pointer md:flex bg-primary-normal
               hover:bg-primary-dark duration-300 px-8 py-5"
            >
              <Link className="w-full" href="/checkout">Fechar pedido</Link>
            </Button> 
            ) : (
              <Button
              className="hidden cursor-pointer md:flex bg-primary-normal
               hover:bg-primary-dark duration-300 px-8 py-5"
            >
              <Link className="w-full" href="/menu">Pedir agora</Link>
            </Button>
            )}
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
  textColor?: string;
}

export function SideBarLink({ href, label, textColor }: SideBarLinkProps) {
  const router = useRouter();

  const isHash = href.startsWith("#");

  const handleClick = (e: React.MouseEvent) => {
    if (isHash) {
      e.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);

      // Se estiver na mesma página, rola suavemente
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        // Se estiver em outra página (ex: #promocoes na learnpage), navega primeiro
        router.push("/" + href);
      }
    }
  };

  return isHash ? (
    <a
      href={href}
      onClick={handleClick}
      className={`${
        textColor || "text-dark-normal"
      } hover:text-primary-normal duration-200 font-bold`}
    >
      {label}
    </a>
  ) : (
    <Link
      href={href}
      className={`${
        textColor || "text-dark-normal"
      } hover:text-primary-normal duration-200 font-bold`}
    >
      {label}
    </Link>
  );
}
