import React from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchDataFromContentful, fetchImageData } from "@/contentful/data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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
    <div>
      <div className="text-center py-5 px-1">
        <div className="bg-gradient-to-r from-primary-dark to-primary text-secondary-light text-center rounded-lg shadow-md mx-5 p-5">
          <h1 className="text-5xl font-bold mb-4">Meet The Team</h1>
          <div className="text-xl">
            WBC and IPCHAS would never be what it is today without our marvelous
            team.
          </div>
        </div>
      </div>
      <section className="py-10">
        <h2 className="text-3xl text-center font-bold mb-6">Our Team</h2>
        <div className="flex flex-wrap justify-center">
          {team.map((t, index) => (
            <Card
              key={t.name}
              className="flex flex-col items-center m-4 p-4 bg-secondary-light text-primary-dark rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              <div className="overflow-hidden rounded-full w-24 h-24 md:w-32 md:h-32 mb-4">
                <Image
                  src={t.imageUrl || "/blank-person.jpeg"}
                  alt={t.name}
                  className="object-cover w-full h-full grayscale-0 hover:grayscale"
                  width={128}
                  height={128}
                />
              </div>
              <CardContent className="text-center">
                <CardTitle className="text-lg font-semibold">
                  {t.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {t.position}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="my-10 text-center">
        <div className="bg-primary text-white rounded-lg shadow-md mx-5 p-5">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg mb-6">
            Interested in joining our team? We would love to hear from you!
          </p>
          <Link
            className="px-8 py-3 bg-secondary text-primary-dark rounded-md font-semibold hover:bg-secondary-dark"
            href="/registration"
          >
            Join Now!
          </Link>
        </div>
      </section>
    </div>
  );
}
