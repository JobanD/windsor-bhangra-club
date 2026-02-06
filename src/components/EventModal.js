import React, { useEffect, useRef, useCallback } from "react";

function EventModal({ isOpen, onClose, eventDetails }) {
  const modalRef = useRef();

  // Function to close modal if clicked outside
  const handleClickOutside = useCallback(
    (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  // Render nothing if the modal is not open or eventDetails are not available
  if (!isOpen || !eventDetails) return null;

  // Formatting the date and hour range
  const eventStartDate = new Date(eventDetails.start);
  const eventEndDate = eventDetails.end ? new Date(eventDetails.end) : null;
  const description =
    eventDetails?.extendedProps?.description ?? eventDetails.description ?? "";

  const formattedDate = eventStartDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedStartTime = eventStartDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const formattedEndTime = eventEndDate
    ? eventEndDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/40 px-4 py-10 backdrop-blur">
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-3xl border border-white/60 bg-white/95 p-6 text-left shadow-2xl"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-primary/60">
          Event Details
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-primary">
          {eventDetails.title}
        </h2>
        <p className="mt-2 text-sm text-primary/70">{formattedDate}</p>

        <div className="mt-4 rounded-2xl border border-primary/10 bg-primary/5 p-4">
          <p className="text-sm font-semibold text-primary">
            {formattedStartTime}
            {formattedEndTime ? ` - ${formattedEndTime}` : ""}
          </p>
        </div>

        <div className="mt-4 rounded-2xl border border-primary/10 bg-white p-4 text-sm text-primary/80">
          {description || "Details coming soon."}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-dark"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default EventModal;
