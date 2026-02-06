"use client";

import React from "react";
import Link from "next/link";
import { Alert, AlertTitle } from "@/components/ui/alert";

const EventCard = ({ event, href, onClick }) => {
  const card = (
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

  if (href) {
    return (
      <Link href={href} className="block">
        {card}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="w-full text-left">
        {card}
      </button>
    );
  }

  return (
    card
  );
};

export default EventCard;
