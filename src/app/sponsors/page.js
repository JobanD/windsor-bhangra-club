import React from "react";
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
      name: "Sponsor Four",
      image: "/windsor_bhangra_group.jpeg",
      link: "http://sponsor4.com",
      description: "Description for Sponsor Four.",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="text-center py-5 px-1">
        <div className="bg-gradient-to-r from-primary-dark to-primary text-secondary-light text-center rounded-lg shadow-md mx-5 p-5">
          <h1 className="text-5xl font-bold mb-4">Our Sponsors</h1>
          <div className="text-xl">
            Our sponsors make everything we do possible, please check out
            everything they have to offer to further support our community.
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor.name} {...sponsor} />
        ))}
      </div>
    </div>
  );
};

export default SponsorsPage;
