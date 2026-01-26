import React from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";

const EventCard = ({ event }) => {
  return (
    <Alert className="group flex flex-col gap-2 rounded-2xl border border-primary/10 bg-white/80 px-4 py-3 text-primary shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/60">
        {new Date(event.start).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>
      <div className="flex items-center justify-between gap-3">
        <AlertTitle className="text-base font-semibold text-primary">
          {event.title}
        </AlertTitle>
        <span className="hidden text-xs font-semibold text-secondary-dark group-hover:inline">
          Details →
        </span>
      </div>
    </Alert>
  );
};

export default EventCard;
