import React from "react";
import dynamic from "next/dynamic";
import { getEventData } from "@/contentful/data";
import EventList from "@/components/EventList";
import Calendar from "@/components/Calendar";

export const metadata = {
  metadataBase: new URL("https://www.windsorbhangraclub.com"),
  title: "Events - IPCHAS & WBC",
  description:
    "Discover upcoming events hosted by IPCHAS and Windsor Bhangra Club. Join us in celebrating and preserving Punjabi/Sikhi culture through community events and activities.",
  keywords:
    "events, IPCHAS, WBC, Windsor Bhangra Club, community events, Punjabi culture, Sikhi culture, Windsor, Ontario, Canada",
  openGraph: {
    title: "Events - IPCHAS & WBC",
    description:
      "Discover upcoming events hosted by IPCHAS and Windsor Bhangra Club. Join us in celebrating and preserving Punjabi/Sikhi culture through community events and activities.",
    images: [
      {
        url: "/public/logo-no-bg.png",
        width: 800,
        height: 600,
        alt: "Events - IPCHAS & WBC",
      },
    ],
    url: "https://www.windsorbhangraclub.com/events",
  },
  alternates: {
    canonical: "https://www.windsorbhangraclub.com/events",
  },
};

export default async function Events() {
  const events = await getEventData();

  return (
    <div className="mx-auto max-w-6xl px-6 pb-16">
      <header className="py-10 text-center">
        <div className="rounded-3xl border border-white/70 bg-white/85 px-6 py-10 shadow-xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/60">
            Events
          </p>
          <h1 className="mt-4 text-4xl font-bold text-primary sm:text-5xl">
            Celebrate with us
          </h1>
          <p className="mt-4 text-base text-primary/80 sm:text-lg">
            Discover upcoming performances, workshops, and community gatherings.
          </p>
        </div>
      </header>
      <div className="my-10 rounded-3xl border border-white/70 bg-white/85 p-6 shadow-lg backdrop-blur">
        <EventList />
      </div>
      <div className="my-8 rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur">
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Event Calendar
        </h2>
        <Calendar events={events} />
      </div>
    </div>
  );
}
