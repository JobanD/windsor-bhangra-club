import React from "react";
import Link from "next/link";
import EventList from "@/components/EventList";
import Image from "next/image";
import logo from "../../public/logo-no-bg.png";

const HeroSection = () => {
  return (
    <div
      className="relative flex flex-col justify-center items-center h-screen text-black"
      style={{ backgroundColor: "hsl(40, 36%, 90%)" }}
    >
      <div className="relative z-10 text-center px-4">
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
      <div className="absolute top-0 right-0 w-full lg:w-1/3 p-4 z-10">
        <EventList />
      </div>
    </div>
  );
};

export default HeroSection;
