import React from "react";
import { getEventData } from "@/contentful/data";
import EventListInteractive from "@/components/EventListInteractive";
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

export default async function Events({ searchParams }) {
  const events = await getEventData();
  const initialDate = searchParams?.date ?? null;

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
        <EventListInteractive events={events} />
      </div>
      <div className="my-8 rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h2 className="text-2xl font-semibold text-primary">
            Event Calendar
          </h2>
          <a
            href="/yearlyCalendar.jpg"
            download
            className="inline-flex items-center justify-center rounded-full border border-primary/30 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition hover:border-primary hover:bg-primary/10"
          >
            Download Yearly Calendar
          </a>
        </div>
        <Calendar events={events} initialDate={initialDate} />
      </div>
    </div>
  );
}
