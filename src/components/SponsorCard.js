import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const levelStyles = {
  "Event Sponsor DD":
    "border-4 border-gold-500 bg-gradient-to-r from-yellow-200 to-yellow-100",
  Diamond:
    "border-4 border-diamond-500 bg-gradient-to-r from-blue-200 to-blue-100",
  Platinum:
    "border-4 border-platinum-500 bg-gradient-to-r from-gray-200 to-gray-100",
  Gold: "border-4 border-gold-500 bg-gradient-to-r from-yellow-300 to-yellow-200",
  Silver:
    "border-4 border-silver-500 bg-gradient-to-r from-gray-300 to-gray-200",
  Bronze:
    "border-4 border-bronze-500 bg-gradient-to-r from-orange-300 to-orange-200",
  "Additional Supporter": "border-2 border-gray-200 bg-gray-100",
};

const sizeStyles = {
  "Event Sponsor DD": "max-w-md",
  Diamond: "max-w-sm",
  Platinum: "max-w-xs",
  Gold: "max-w-xs",
  Silver: "max-w-xs",
  Bronze: "max-w-xs",
  "Additional Supporter": "max-w-xs",
};

const SponsorCard = ({ name, imageUrl, link, description, level }) => {
  return (
    <div
      className={`p-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 ${levelStyles[level]} ${sizeStyles[level]}`}
    >
      <div className="relative overflow-hidden rounded-lg mb-4">
        <Image
          src={imageUrl}
          alt={name}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          width={500}
          height={300}
          className="rounded-lg"
        />
      </div>
      <h3 className="text-xl font-bold mt-2">{name}</h3>
      {level !== "Additional Supporter" && (
        <>
          <p className="text-gray-600 mb-4">{description}</p>
          <Button
            as={Link}
            href={link}
            className="bg-secondary text-primary-dark font-semibold py-2 px-4 w-full rounded-md hover:bg-secondary-dark transition-colors"
          >
            Learn More
          </Button>
        </>
      )}
    </div>
  );
};

export default SponsorCard;
