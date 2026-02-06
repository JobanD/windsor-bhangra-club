"use client";

import React from "react";
import EventCard from "./EventListCard";
import EventModal from "./EventModal";
import { Alert, AlertTitle } from "@/components/ui/alert";

const EventListInteractive = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  const today = new Date();
  const upcomingEvents = events.filter(
    (event) => new Date(event.start) >= today
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary/60">
            Calendar
          </p>
          <h2 className="text-2xl font-semibold text-primary">
            Upcoming Events
          </h2>
        </div>
      </div>
      <div className="space-y-3">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <EventCard
              key={`${event.start}-${event.title}`}
              event={event}
              onClick={() => setSelectedEvent(event)}
            />
          ))
        ) : (
          <Alert className="flex flex-col sm:flex-row items-start sm:items-center rounded-2xl border border-secondary/30 bg-secondary-light/60 px-4 py-3 text-secondary-dark">
            <AlertTitle className="text-sm font-semibold">
              No Upcoming Events
            </AlertTitle>
          </Alert>
        )}
      </div>
      <EventModal
        isOpen={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
        eventDetails={selectedEvent}
      />
    </div>
  );
};

export default EventListInteractive;
