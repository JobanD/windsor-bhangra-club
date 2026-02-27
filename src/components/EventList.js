import Link from "next/link";
import EventCard from "./EventListCard";
import { getEventData } from "@/contentful/data";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { getUpcomingEventGroups } from "@/lib/events";

const WINDSOR_TIME_ZONE = "America/Toronto";

const formatDateForEventsQuery = (dateValue) => {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: WINDSOR_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(new Date(dateValue));
  const values = {};
  parts.forEach(({ type, value }) => {
    if (type !== "literal") values[type] = value;
  });
  return `${values.year}-${values.month}-${values.day}`;
};

export default async function EventList({ linkToCalendar = false }) {
  const events = await getEventData();
  const today = new Date();
  const { items: upcomingEvents, totalCount } = getUpcomingEventGroups(
    events,
    today
  );

  const MOBILE_LIMIT = 3;
  const DESKTOP_LIMIT = 5;
  const hasMore = totalCount > MOBILE_LIMIT;
  const displayedEvents = upcomingEvents.slice(0, DESKTOP_LIMIT);

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
          displayedEvents.map((event, index) => {
            const eventDate = event.start
              ? formatDateForEventsQuery(event.start)
              : null;
            const href =
              linkToCalendar && eventDate
                ? `/events?date=${eventDate}`
                : null;

            const countLabel =
              event.recurrenceCount > 0
                ? event.recurrenceCount === 1
                  ? "1 date"
                  : `${event.recurrenceCount} dates`
                : null;
            const badge = event.isRecurring
              ? `${event.recurrenceLabel}${
                  countLabel ? ` · ${countLabel}` : ""
                }`
              : null;
            const note = event.isRecurring ? "Next date shown" : null;

            return (
              <div
                key={`${event.start}-${event.title}`}
                className={index >= MOBILE_LIMIT ? "hidden sm:block" : ""}
              >
                <EventCard event={event} href={href} badge={badge} note={note} />
              </div>
            );
          })
        ) : (
          <Alert className="flex flex-col sm:flex-row items-start sm:items-center rounded-2xl border border-secondary/30 bg-secondary-light/60 px-4 py-3 text-secondary-dark">
            <AlertTitle className="text-sm font-semibold">
              No Upcoming Events
            </AlertTitle>
          </Alert>
        )}
      </div>
      {hasMore ? (
        <div className="mt-4 text-xs text-primary/60">
          <span className="sm:hidden">
            Showing {Math.min(MOBILE_LIMIT, totalCount)} of {totalCount} upcoming
            events.
          </span>
          <span className="hidden sm:inline">
            Showing {Math.min(DESKTOP_LIMIT, totalCount)} of {totalCount} upcoming
            events.
          </span>
          {linkToCalendar ? (
            <span className="ml-2 inline-flex items-center gap-1">
              <Link href="/events" className="font-semibold text-primary">
                View all events
              </Link>
              →
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
