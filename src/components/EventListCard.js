"use client";

import React from "react";
import Link from "next/link";
import { Alert, AlertTitle } from "@/components/ui/alert";

const EventCard = ({ event, href, onClick, badge, note }) => {
  const card = (
    <Alert className="group flex flex-col gap-2 rounded-2xl border border-primary/10 bg-white/80 px-4 py-3 text-primary shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary/60">
        <span>
          {new Date(event.start).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        {badge ? (
          <span className="rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-semibold text-primary">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="flex items-center justify-between gap-3">
        <AlertTitle className="text-base font-semibold text-primary">
          {event.title}
        </AlertTitle>
        <span className="hidden text-xs font-semibold text-secondary-dark group-hover:inline">
          Details →
        </span>
      </div>
      {note ? (
        <p className="text-xs text-primary/60">{note}</p>
      ) : null}
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
