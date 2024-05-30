import React from "react";
import dynamic from "next/dynamic";
import { getEventData } from "@/contentful/data";
import EventList from "@/components/EventList";
import Calendar from "@/components/Calendar";

// const Calendar = dynamic(() => import("@/components/Calendar"), {
//   ssr: false, // This will ensure it's only loaded client-side
// });

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
