import React from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";

const EventCard = ({ event }) => {
  return (
    <Alert className="flex flex-col sm:flex-row items-start sm:items-center mb-5 p-2 border border-gray-300 rounded-md bg-secondary-light text-secondary-dark max-w-full lg:max-w-md mx-auto">
      <div className="font-bold text-lg sm:text-xl mr-0 sm:mr-3 whitespace-nowrap">
        {new Date(event.start).toLocaleDateString()}
      </div>
      <div className="flex-grow">
        <AlertTitle className="text-base sm:text-lg font-semibold">
          {event.title}
        </AlertTitle>
      </div>
    </Alert>
  );
};

export default EventCard;
