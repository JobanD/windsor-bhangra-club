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
    <div className="w-full lg:w-3/4 mx-auto">
      <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4 text-center">
        Upcoming Events
      </h2>
      <div className="space-y-2">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <EventCard key={`${event.start}-${event.title}`} event={event} />
          ))
        ) : (
          <Alert className="flex flex-col sm:flex-row items-start sm:items-center mb-5 p-2 border border-gray-300 rounded-md bg-secondary-light text-secondary-dark max-w-full lg:max-w-md mx-auto">
            <AlertTitle className="text-base sm:text-lg font-semibold">
              No Upcoming Events
            </AlertTitle>
          </Alert>
        )}
      </div>
    </div>
  );
}
