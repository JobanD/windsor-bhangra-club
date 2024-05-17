import React from "react";
import Link from "next/link";
import EventList from "@/components/EventList";

const HeroSection = () => {
  return (
    <div
      className="relative flex flex-col justify-center items-center h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url('/heroNew.jpg')` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl font-bold text-primary mt-[-2rem] sm:mt-0 lg:text-8xl">
          <span className="text-secondary">W</span>indsor <br />
          <span className="text-secondary">B</span>hangra <br />
          <span className="text-secondary">C</span>lub
        </h1>
        <h2 className="text-2xl text-secondary mt-4">
          Welcome, please explore the many things IPCHAS offers.
        </h2>
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            href="/about"
            className="bg-secondary text-black py-2 px-6 rounded font-bold hover:bg-secondary-dark transition"
          >
            Learn More
          </Link>
          <Link
            href="/events"
            className="bg-secondary text-black py-2 px-6 rounded font-bold hover:bg-secondary-dark transition"
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
