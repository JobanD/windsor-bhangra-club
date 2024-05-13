import React from "react";

const EventCard = ({ event }) => {
  return (
    <div
      style={{
        display: "flex",
        marginBottom: "20px",
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <div
        style={{ marginRight: "20px", fontWeight: "bold", fontSize: "20px" }}
      >
        {new Date(event.start).toLocaleDateString()}
      </div>
      <div>
        <h4>{event.title}</h4>
        <p>{event.description}</p>
      </div>
    </div>
  );
};

export default EventCard;
