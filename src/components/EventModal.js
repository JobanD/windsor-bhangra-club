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
  const eventEndDate = new Date(eventDetails.end);

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
  const formattedEndTime = eventEndDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-white p-5 rounded-lg shadow-lg max-w-sm mx-auto text-center"
      >
        <h2 className="text-xl font-semibold text-primary mb-2">
          {formattedDate} - {eventDetails.title}
        </h2>

        <div className="bg-gray-100 p-3 rounded mb-4">
          <p className="text-gray-800">
            {formattedStartTime} - {formattedEndTime}
          </p>
        </div>

        <div className="bg-gray-100 p-3 rounded">
          <p className="text-gray-800">
            {eventDetails.extendedProps.description}
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default EventModal;
