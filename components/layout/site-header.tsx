"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Theme } from "@/components/layout/theme-scope";

const brandByTheme: Record<
  Theme,
  {
    logoSrc: string;
    logoAlt: string;
    wordmark: string;
    wordmarkClassName?: string;
    ctaLabel: string;
    ctaHref: string;
  }
> = {
  monarka: {
    logoSrc: "/assets/monarka-logo-dark.png",
    logoAlt: "Monarka TECH",
    wordmark: "Monarka TECH",
    ctaLabel: "Ver CATA",
    ctaHref: "/products/cata",
  },
  cata: {
    logoSrc: "/assets/cata/cata-badge.png",
    logoAlt: "CATA",
    wordmark: "CATA",
    wordmarkClassName: "font-heading italic tracking-normal normal-case",
    ctaLabel: "Monarka TECH ↗",
    ctaHref: "/",
  },
  legal: {
    logoSrc: "/assets/monarka-logo-dark.png",
    logoAlt: "Monarka TECH",
    wordmark: "Monarka TECH",
    ctaLabel: "Ver CATA",
    ctaHref: "/products/cata",
  },
};

export function SiteHeader({ theme = "monarka" }: { theme?: Theme }) {
  const [scrolled, setScrolled] = useState(false);
  const brand = brandByTheme[theme];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled
          ? "border-border bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={brand.logoSrc}
            alt={brand.logoAlt}
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
            priority
          />
          <span
            className={cn(
              "text-[13px] font-bold uppercase tracking-[0.12em]",
              brand.wordmarkClassName
            )}
          >
            {brand.wordmark}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href={brand.ctaHref}
          className={cn(
            buttonVariants({ size: "sm" }),
            "hidden rounded-full md:inline-flex"
          )}
        >
          {brand.ctaLabel}
        </Link>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Abrir menú"
              />
            }
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>Menú</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-6 px-6 pb-8">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-2xl font-bold tracking-tight transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={brand.ctaHref}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-4 rounded-full"
                )}
              >
                {brand.ctaLabel}
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
