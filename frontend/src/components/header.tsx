"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2, Settings, Menu } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeSelector } from "@/components/theme-selector";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    name: "Properties",
    href: "/properties",
    icon: Building2,
  },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Building2 className="h-6 w-6" />
          <span className="font-bold text-xl hidden sm:inline-block">
            PricePOL
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 flex-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="hidden md:flex items-center gap-2">
            <ThemeSelector />
            <ModeToggle />
          </div>

          <Link href="/settings">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "hidden md:flex",
                pathname === "/settings" && "bg-accent"
              )}
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                {/* Mobile Navigation Links */}
                <nav className="flex flex-col gap-2">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                          isActive
                            ? "bg-accent text-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-primary"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                  <Link
                    href="/settings"
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      pathname === "/settings"
                        ? "bg-accent text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-primary"
                    )}
                  >
                    <Settings className="h-5 w-5" />
                    Settings
                  </Link>
                </nav>

                {/* Mobile Theme Controls */}
                <div className="flex flex-col gap-3 pt-4 border-t">
                  <ThemeSelector />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Dark Mode</span>
                    <ModeToggle />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
