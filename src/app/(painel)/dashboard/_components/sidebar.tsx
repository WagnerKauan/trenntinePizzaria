"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  CalendarCheck2,
  ChevronLeft,
  ChevronRight,
  Flame,
  List,
  Pizza,
  Settings,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

export function SidebarDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sections = [
    {
      title: "Painel",
      items: [
        { href: "/dashboard", label: "Pedidos", icon: <CalendarCheck2 /> },
        { href: "/dashboard/products", label: "Produtos", icon: <Pizza /> },
        { href: "/dashboard/promotions", label: "Promoções", icon: <Flame /> },
      ],
    },
    {
      title: "Configurações",
      items: [
        { href: "/dashboard/profile", label: "Meu perfil", icon: <Settings /> },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen w-full">
      <aside
        className={clsx(
          "flex flex-col border-r border-gray-100 bg-background transition-all duration-300 p-4 h-full",
          {
            "w-20": isCollapsed,
            "w-64": !isCollapsed,
            "hidden md:flex md:fixed": true,
          }
        )}
      >
        <div className="mb-6 mt-4flex items-center">
          {!isCollapsed && (
            <Image
              src={"/image/logoTrentine 1.png"}
              alt="Logo Trentinne"
              priority
              quality={100}
              style={{ width: "auto", height: "auto" }}
              width={140}
              height={53}
              className="mx-auto"
            />
          )}
        </div>

        <Button
          className="bg-gray-100 hover:bg-gray-200 duration-300 text-dark-normal self-end cursor-pointer mb-2"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </Button>

        {isCollapsed && (
          <nav className="flex flex-col gap-4 mt-2">
            {sections.flatMap((section) =>
              section.items.map((item) => (
                <SidebarLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />
              ))
            )}
          </nav>
        )}

        <Collapsible open={!isCollapsed}>
          <CollapsibleContent>
            <nav className="flex flex-col gap-4">
              {sections.map((section) => (
                <div key={section.title}>
                  {!isCollapsed && (
                    <span className="text-xs text-gray-400 font-semibold uppercase mb-2 block">
                      {section.title}
                    </span>
                  )}
                  <div className="flex flex-col gap-2">
                    {section.items.map((item) => (
                      <SidebarLink
                        key={item.href}
                        href={item.href}
                        label={item.label}
                        icon={item.icon}
                        pathname={pathname}
                        isCollapsed={isCollapsed}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </CollapsibleContent>
        </Collapsible>
      </aside>

      <div
        className={clsx("flex flex-1 flex-col transition-all duration-300 ", {
          "md:ml-20": isCollapsed,
          "md:ml-64": !isCollapsed,
        })}
      >
        <header
          className="md:hidden flex items-center justify-between border-b border-gray-200 
          px-4 md:px-6 h-14 z-10 sticky top-0 bg-white"
        >
          <Sheet>
            <div className="flex items-center gap-4">
              <SheetTrigger asChild>
                <Button 
                  variant={"outline"} 
                  size={"icon"} 
                  className="md:hidden"
                  onClick={() => setIsCollapsed(false)}
                >
                  <List className="w-5 h-5" />
                </Button>
              </SheetTrigger>

              <h1 className="text-base md:text-lg font-semibold">
                Menu Trentinne
              </h1>
            </div>

            <SheetContent className="sm:max-w-xs text-dark-normal p-4">
              <SheetTitle>Trentinne</SheetTitle>
              <SheetDescription>Area de gerenciamento</SheetDescription>

              <nav className="grid gap-2 text-base pt-5">
                {sections.flatMap((section) =>
                  section.items.map((item) => (
                    <SidebarLink
                      key={item.href}
                      href={item.href}
                      icon={item.icon}
                      label={item.label}
                      pathname={pathname}
                      isCollapsed={isCollapsed}
                    />
                  ))
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 py-4 px-2 md:p-6">{children}</main>
      </div>
    </div>
  );
}

interface sidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  pathname: string;
  isCollapsed: boolean;
}

function SidebarLink({
  href,
  icon,
  label,
  pathname,
  isCollapsed,
}: sidebarLinkProps) {
  return (
    <Link href={href}>
      <div
        className={clsx(
          "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
          {
            "text-white bg-primary-normal": pathname === href,
            "text-dark-normal hover:bg-gray-100": pathname !== href,
          }
        )}
      >
        <span className="w-6 h-6">{icon}</span>
        {!isCollapsed && <span className="font-semibold">{label}</span>}
      </div>
    </Link>
  );
}
