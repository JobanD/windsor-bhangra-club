import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SponsorCard = ({ name, image, link, description }) => {
  return (
    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 border border-gray-200">
      <div className="overflow-hidden rounded-lg mb-4">
        <Image
          src={image}
          alt={name}
          className="w-full h-auto md:w-auto object-cover rounded-lg"
          width="0"
          height="0"
          sizes="100vw"
        />
      </div>
      <h3 className="text-xl font-bold mt-2">{name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Button
        as={Link}
        href={link}
        className="bg-secondary text-primary-dark font-semibold py-2 px-4 w-full rounded-md hover:bg-secondary-dark transition-colors"
      >
        Learn More
      </Button>
    </div>
  );
};

export default SponsorCard;
