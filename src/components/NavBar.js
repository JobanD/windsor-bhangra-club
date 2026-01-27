"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  BookOpenText,
  Users,
  ClipboardPen,
  Gift,
  Crown,
  CalendarDays,
  ContactRound,
  Film,
  Newspaper,
} from "lucide-react"; // Importing icons
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator"; // Importing Separator from ShadCN

// images
import logo from "../../public/logo-no-bg.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const menuItems = [
    { href: "/about", label: "About Us", icon: BookOpenText },
    // { href: "/team", label: "Our Team", icon: Users },
    { href: "/registration", label: "Registration", icon: ClipboardPen },
    // { href: "/sponsors", label: "Sponsors", icon: Crown },
    // { href: "/donate", label: "Donate", icon: Gift },
    { href: "/news", label: "News", icon: Newspaper },
    { href: "/events", label: "Event Calendar", icon: CalendarDays },
    { href: "/contact", label: "Contact Us", icon: ContactRound },
    // { href: "/services", label: "Media", icon: Film },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/85 text-primary shadow-sm backdrop-blur border-b border-white/40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src={logo}
                alt="Logo"
                width={88}
                height={88}
                placeholder="blur"
              />
            </Link>
            <Link href="/" className="ml-4 text-xl font-semibold tracking-wide">
              IPCHAS
            </Link>
          </div>
          <div className="hidden lg:flex space-x-6">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-6">
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      as={Link}
                      href={item.href}
                      className={`rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-primary hover:bg-primary/10 ${
                        pathname === item.href
                          ? "text-primary bg-primary/15"
                          : ""
                      }`}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <button
            className="lg:hidden rounded-full border border-primary/20 p-2 text-primary shadow-sm hover:bg-primary/10 focus:outline-none"
            onClick={handleMobileMenuToggle}
          >
            {mobileMenuOpen ? (
              <X className="h-7 w-7 text-primary" />
            ) : (
              <Menu className="h-7 w-7 text-primary" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu - Outside header to avoid stacking context issues */}
      <div
        className={`fixed inset-0 bg-primary text-white z-[100] flex flex-col items-center transition-transform duration-300 overflow-y-auto ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-8 right-6 rounded-full border border-white/20 p-2 focus:outline-none"
          onClick={handleMobileMenuToggle}
        >
          <X className="h-7 w-7 text-white" />
        </button>
        <div className="flex flex-col items-center space-y-6 my-auto py-24">
          {menuItems.map((item, index) => (
            <div key={item.href} className="flex flex-col items-center w-full">
              <Link
                href={item.href}
                className="flex items-center text-2xl font-semibold tracking-wide hover:text-secondary"
                onClick={handleMobileMenuToggle}
              >
                <item.icon className="h-6 w-6 mr-2" />
                {item.label}
              </Link>
              {index < menuItems.length - 1 && (
                <Separator className="w-3/4 my-4 bg-white/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
