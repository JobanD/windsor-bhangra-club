import React from "react";
import { Box, Typography, Container } from "@mui/material";
import Image from "next/image";

// components
import SponsorCard from "@/components/SponsorCard";

const SponsorsPage = () => {
  const sponsors = [
    {
      name: "Sponsor One",
      image: "/windsor_bhangra_group.jpeg",
      link: "http://sponsor1.com",
      description: "Description for Sponsor One.",
    },
    {
      name: "Sponsor Two",
      image: "/windsor_bhangra_group.jpeg",
      link: "http://sponsor2.com",
      description: "Description for Sponsor Two.",
    },
    {
      name: "Sponsor Three",
      image: "/windsor_bhangra_group.jpeg",
      link: "http://sponsor3.com",
      description: "Description for Sponsor Three.",
    },
    {
      name: "Sponsor Three",
      image: "/windsor_bhangra_group.jpeg",
      link: "http://sponsor3.com",
      description: "Description for Sponsor Three.",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Our Sponsors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor.name} {...sponsor} />
        ))}
      </div>
    </div>
  );
};

export default SponsorsPage;
