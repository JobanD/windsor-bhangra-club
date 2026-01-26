import EventCard from "./EventListCard";
import { getEventData } from "@/contentful/data";
import { Alert, AlertTitle } from "@/components/ui/alert";

export default async function EventList() {
  const events = await getEventData();

  // Filter events to only include those occurring from today's date onwards
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
            <EventCard key={`${event.start}-${event.title}`} event={event} />
          ))
        ) : (
          <Alert className="flex flex-col sm:flex-row items-start sm:items-center rounded-2xl border border-secondary/30 bg-secondary-light/60 px-4 py-3 text-secondary-dark">
            <AlertTitle className="text-sm font-semibold">
              No Upcoming Events
            </AlertTitle>
          </Alert>
        )}
      </div>
    </div>
  );
}
