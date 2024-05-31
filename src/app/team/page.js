import React from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchDataFromContentful, fetchImageData } from "@/contentful/data";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const metadata = {
  metadataBase: new URL("https://www.windsorbhangraclub.com"),
  title: "Our Team - IPCHAS & WBC",
  description:
    "Meet the dedicated team behind IPCHAS and Windsor Bhangra Club. Learn about the individuals who are committed to promoting Punjabi/Sikhi culture and community involvement.",
  keywords:
    "team, members, IPCHAS, WBC, Windsor Bhangra Club, Punjabi culture, Sikhi culture, Windsor, Ontario, Canada, community involvement",
  openGraph: {
    title: "Our Team - IPCHAS & WBC",
    description:
      "Meet the dedicated team behind IPCHAS and Windsor Bhangra Club. Learn about the individuals who are committed to promoting Punjabi/Sikhi culture and community involvement.",
    images: [
      {
        url: "/public/logo-no-bg.png",
        width: 800,
        height: 600,
        alt: "Our Team - IPCHAS & WBC",
      },
    ],
    url: "https://www.windsorbhangraclub.com/team",
  },
  alternates: {
    canonical: "https://www.windsorbhangraclub.com/team",
  },
};

export default async function MeetTheTeamPage() {
  // Fetch basic team data
  const teamData = await fetchDataFromContentful("person", 10);

  if (!teamData) {
    return <div>Error: Failed to fetch data.</div>;
  }

  // Fetch images for each team member
  const team = await Promise.all(
    teamData.items.map(async (person) => {
      const imageUrl = person.fields.image
        ? await fetchImageData(person.fields.image.sys.id)
        : null;

      return {
        ...person.fields,
        imageUrl: imageUrl,
      };
    })
  );

  return (
    <div className="container mx-auto px-4">
      <header className="text-center py-10">
        <div className="bg-gradient-to-r from-primary-dark to-primary text-secondary-light rounded-lg shadow-md mx-5 p-10">
          <h1 className="text-5xl font-bold mb-4">Meet The Team</h1>
          <p className="text-xl">
            WBC and IPCHAS would never be what it is today without our marvelous
            team.
          </p>
        </div>
      </header>
      <section className="py-10">
        <div className="bg-primary text-white text-center rounded-lg shadow-md mx-5 p-6 mb-10">
          <p className="text-lg">
            Our team is the backbone of WBC and IPCHAS. Each member brings a
            unique set of skills and a passion for excellence. Together, we
            strive to achieve greatness and provide the best services to our
            community. We are proud of our dedicated team and their unwavering
            commitment.
          </p>
        </div>
        <h2 className="text-3xl text-center font-bold mb-6">Our Team</h2>
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {team.map((t) => (
                <CarouselItem
                  key={t.name}
                  className="basis-1/2 md:basis-1/4 lg:basis-1/6"
                >
                  <div className="p-2">
                    <Card className="flex flex-col items-center p-4 bg-secondary-light text-primary-dark rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                      <div className="overflow-hidden rounded-full w-16 h-16 md:w-24 md:h-24 mb-4">
                        <Image
                          src={t.imageUrl || "/blank-person.jpeg"}
                          alt={t.name}
                          className="object-cover w-full h-full grayscale-0 hover:grayscale"
                          width={96}
                          height={96}
                        />
                      </div>
                      <CardContent className="text-center">
                        <CardTitle className="text-sm font-semibold">
                          {t.name}
                        </CardTitle>
                        <CardDescription className="text-xs text-gray-600">
                          {t.position}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10" />
          </Carousel>
        </div>
      </section>
      <section className="my-10 text-center">
        <div className="bg-primary text-white rounded-lg shadow-md mx-5 p-10 relative">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg mb-6">
            Interested in joining our team? We would love to hear from you!
          </p>
          <Link
            className="inline-block px-8 py-3 bg-secondary text-primary-dark rounded-md font-semibold hover:bg-secondary-dark transition duration-300"
            href="/registration"
          >
            Join Now!
          </Link>
        </div>
      </section>
    </div>
  );
}
