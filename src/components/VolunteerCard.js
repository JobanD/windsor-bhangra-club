import React from "react";
import Image from "next/image";

const VolunteerCard = ({ image, name, title }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-3 text-center m-3">
      <Image
        src={image}
        alt={name}
        className="rounded-full w-32 h-32 mx-auto mb-4"
        width="0"
        height="0"
        sizes="100vw"
      />
      <h4 className="text-lg font-medium">{name}</h4>
      <p className="text-secondary">{title}</p>
    </div>
  );
};

export default VolunteerCard;
