import React from "react";
import Link from "next/link";
import EventList from "@/components/EventList";
import Image from "next/image";
import logo from "../../public/logo-no-bg.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="container mx-auto grid items-center gap-12 px-6 py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:py-24">
        <div className="relative z-10 text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            Windsor, Ontario
          </div>
          <div className="mt-8 flex items-center gap-4">
            <Image
              src={logo}
              alt="Windsor Bhangra Club logo"
              width={120}
              height={120}
              className="rounded-full border border-white/70 bg-white/70 p-3 shadow-lg"
              placeholder="blur"
            />
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary/70">
                IPCHAS presents
              </p>
              <h1 className="text-5xl font-bold text-primary sm:text-6xl lg:text-7xl">
                Windsor <br />
                Bhangra <br />
                Club
              </h1>
            </div>
          </div>
          <p className="mt-6 max-w-xl text-lg text-primary/80">
            Welcome, please explore the many things IPCHAS offers. Classes,
            events, and community programs that celebrate Punjabi and Sikhi
            culture.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground shadow-lg shadow-secondary/30 transition hover:bg-secondary-dark"
            >
              Learn More
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center justify-center rounded-full border border-primary/30 px-6 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
            >
              View Events
            </Link>
          </div>
        </div>

        <div className="relative z-10">
          <div className="hidden md:block rounded-3xl border border-white/70 bg-white/80 p-6 shadow-2xl backdrop-blur">
            <EventList linkToCalendar />
          </div>
          <div className="block md:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <button className="w-full rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground shadow-lg shadow-secondary/30 transition hover:bg-secondary-dark">
                  Show Events
                </button>
              </PopoverTrigger>
              <PopoverContent className="bg-white/95 p-4 rounded-2xl shadow-xl w-80">
                <EventList linkToCalendar />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
