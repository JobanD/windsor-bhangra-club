import React from "react";
import { fetchDataFromContentful, fetchImageData } from "@/contentful/data";
import SponsorCard from "@/components/SponsorCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const sponsorLevels = [
  "Event Sponsor DD",
  "Diamond",
  "Platinum",
  "Gold",
  "Silver",
  "Bronze",
  "Additional Supporter",
];

export const metadata = {
  metadataBase: new URL("https://www.windsorbhangraclub.com"),
  title: "Sponsors - IPCHAS & WBC",
  description:
    "Meet our sponsors who support IPCHAS and Windsor Bhangra Club. Learn how you can become a sponsor and contribute to our mission of promoting Punjabi/Sikhi culture.",
  keywords:
    "sponsors, support, IPCHAS, WBC, Windsor Bhangra Club, Punjabi culture, Sikhi culture, Windsor, Ontario, Canada, community support",
  openGraph: {
    title: "Sponsors - IPCHAS & WBC",
    description:
      "Meet our sponsors who support IPCHAS and Windsor Bhangra Club. Learn how you can become a sponsor and contribute to our mission of promoting Punjabi/Sikhi culture.",
    images: [
      {
        url: "/public/logo-no-bg.png",
        width: 800,
        height: 600,
        alt: "Sponsors - IPCHAS & WBC",
      },
    ],
    url: "https://www.windsorbhangraclub.com/sponsors",
  },
  alternates: {
    canonical: "https://www.windsorbhangraclub.com/sponsors",
  },
};

export default async function SponsorsPage() {
  const sponsorData = await fetchDataFromContentful("sponsor", 10);

  if (!sponsorData) {
    return <div>Error: Failed to fetch data.</div>;
  }

  // Fetch images for each sponsor
  const sponsors = await Promise.all(
    sponsorData.items.map(async (s) => {
      const imageUrl = s.fields.image
        ? await fetchImageData(s.fields.image.sys.id)
        : null;

      return {
        ...s.fields,
        imageUrl: imageUrl,
      };
    })
  );

  const groupedSponsors = sponsorLevels.reduce((acc, level) => {
    acc[level] = sponsors.filter((s) => s.level === level);
    return acc;
  }, {});

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
      <div className="bg-white text-center rounded-lg shadow-md mx-5 p-5 my-8">
        <h2 className="text-3xl font-bold mb-4">Why Sponsorship Matters</h2>
        <p className="text-lg">
          Sponsorship allows us to deliver outstanding events, provide
          exceptional services, and support our community in meaningful ways.
          Our sponsors are an integral part of our success, and we deeply
          appreciate their contributions.
        </p>
      </div>
      {sponsorLevels.slice(0, -1).map((level) => (
        <div key={level} className="my-8">
          <h2
            className={`text-3xl font-bold mb-4 ${
              level === "Event Sponsor DD"
                ? "text-primary-dark"
                : "text-primary"
            }`}
          >
            {level} Sponsors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groupedSponsors[level].map((s) => (
              <SponsorCard
                key={s.name}
                name={s.name}
                imageUrl={s.imageUrl}
                link={s.link}
                description={s.description}
                level={s.level}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="my-8">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          Additional Supporters
        </h2>
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {groupedSponsors["Additional Supporter"].map((s) => (
                <CarouselItem
                  key={s.name}
                  className="basis-1/2 md:basis-1/4 lg:basis-1/6"
                >
                  <div className="p-2">
                    <SponsorCard
                      name={s.name}
                      imageUrl={s.imageUrl}
                      level={s.level}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
