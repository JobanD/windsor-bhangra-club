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
    <div
      className="relative flex flex-col justify-center items-center h-full pb-16 md:h-screen md:pb-0 text-black"
      style={{ backgroundColor: "hsl(40, 36%, 90%)" }}
    >
      <div className="relative z-10 text-center px-4 m-2">
        <Image
          src={logo}
          alt="Logo"
          width={300}
          height={300}
          className="mx-auto mb-8"
          placeholder="blur"
        />
        <h1 className="text-6xl font-bold text-primary mt-[-2rem] sm:mt-0 lg:text-8xl">
          Windsor <br />
          Bhangra <br />
          Club
        </h1>
        <h2 className="text-2xl text-primary-dark mt-4">
          Welcome, please explore the many things IPCHAS offers.
        </h2>
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            href="/about"
            className="bg-secondary text-secondary-foreground py-2 px-6 rounded font-bold hover:bg-secondary-dark transition"
          >
            Learn More
          </Link>
          <Link
            href="/events"
            className="bg-secondary text-secondary-foreground py-2 px-6 rounded font-bold hover:bg-secondary-dark transition"
          >
            Events
          </Link>
        </div>
      </div>
      {/* Popover for mobile screens */}
      <div className="block md:hidden absolute top-2 right-2 z-20">
        <Popover>
          <PopoverTrigger asChild>
            <button className="bg-secondary text-secondary-foreground p-2 m-2 rounded-md hover:bg-secondary-dark transition">
              Show Events
            </button>
          </PopoverTrigger>
          <PopoverContent className="bg-white p-4 rounded-lg shadow-lg w-80">
            <EventList />
          </PopoverContent>
        </Popover>
      </div>
      {/* Event list for larger screens */}
      <div className="hidden md:block absolute top-0 right-0 w-full lg:w-1/3 p-4 z-10">
        <EventList />
      </div>
    </div>
  );
};

export default HeroSection;
