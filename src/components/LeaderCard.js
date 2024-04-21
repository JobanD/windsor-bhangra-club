import React from "react";
import Image from "next/image";

const LeaderCard = ({ image, name, title, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 text-center m-4">
      <Image
        src={image}
        alt={name}
        className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
        width="0"
        height="0"
        sizes="100vw"
      />
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-primary mb-2">{title}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default LeaderCard;
