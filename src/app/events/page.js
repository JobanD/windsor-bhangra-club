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
    <div className="container mx-auto px-4">
      <div className="my-10">
        <EventList />
      </div>
      <div className="my-4">
        <h1 className="text-2xl font-bold mb-4">Event Calendar</h1>
        <Calendar events={events} />
      </div>
    </div>
  );
}
