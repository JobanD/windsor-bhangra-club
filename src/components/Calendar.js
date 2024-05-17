"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridWeek from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";

// components
import EventModal from "./EventModal";

const Calendar = ({ events }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  const handleEventClick = ({ event }) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  // Function to determine the appropriate calendar height
  const getCalendarHeight = () => {
    return window.innerWidth < 768 ? "auto" : "100vh"; // 'auto' for mobile, '100vh' for larger screens
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridWeek]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        // height={getCalendarHeight()}
        // height={auto}
        aspectRatio={1.35} // Adjust as needed for your design
        // windowResize={function (view) {
        //   this.setOption("height", getCalendarHeight());
        // }}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        // dayCellContent={({ date, dayNumberText, view }) => {
        //   // Apply custom styling if the cell represents today's date
        //   if (isToday(date)) {
        //     // Create a new element to add custom styles for highlighting
        //     const todayElement = document.createElement("div");
        //     todayElement.classList.add("highlight-today"); // Add your custom class here
        //     todayElement.textContent = dayNumberText;
        //     return { html: todayElement.outerHTML };
        //   }

        //   return { domNodes: [document.createTextNode(dayNumberText)] };
        // }}
        eventContent={({ event, view }) => {
          let startTime = "";
          if (event.start) {
            const hours = event.start.getHours();
            const minutes = event.start.getMinutes();
            const ampm = hours >= 12 ? "PM" : "AM";
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

            startTime = `${formattedHours}:${formattedMinutes} ${ampm}:`;
          }

          return (
            <div className="bg-secondary-light w-full rounded-md p-1 flex flex-wrap items-baseline text-xs sm:text-sm">
              <span className="truncate mr-1">{startTime}</span>
              <span className="truncate font-bold">{event.title}</span>
            </div>
          );
        }}
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
