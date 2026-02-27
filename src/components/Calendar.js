"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

// components
import EventModal from "./EventModal";

const WINDSOR_TIME_ZONE = "America/Toronto";

const formatTimeInWindsor = (dateValue) => {
  if (!dateValue) return "";
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: WINDSOR_TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(dateValue));
};

const Calendar = ({ events, initialDate }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const safeEvents = Array.isArray(events) ? events : [];

  const handleEventClick = ({ event }) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const parsedInitialDate =
    initialDate && !Number.isNaN(new Date(initialDate).getTime())
      ? initialDate
      : undefined;

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        initialDate={parsedInitialDate}
        timeZone={WINDSOR_TIME_ZONE}
        events={safeEvents}
        eventClick={handleEventClick}
        height="auto"
        contentHeight="auto"
        expandRows
        aspectRatio={1.35}
        fixedWeekCount={false}
        showNonCurrentDates={false}
        dayMaxEventRows={3}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "",
        }}
        eventContent={({ event }) => {
          const startTime = event.start ? `${formatTimeInWindsor(event.start)}:` : "";

          return (
            <div className="flex w-full flex-wrap items-baseline rounded-md bg-secondary-light p-1 text-xs sm:text-sm">
              <span className="truncate mr-1">{startTime}</span>
              <span className="truncate font-bold">{event.title}</span>
            </div>
          );
        }}
        noEventsContent={
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary/50">
            No events this month
          </span>
        }
      />
      <EventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        eventDetails={selectedEvent}
      />
    </>
  );
};

export default Calendar;
