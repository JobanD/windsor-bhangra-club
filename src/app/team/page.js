import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { fetchDataFromContentful, fetchImageData } from "@/contentful/data";

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
      <section className="py-10">
        <h2 className="text-3xl text-center font-bold mb-6">Our Team</h2>
        <div className="flex flex-wrap justify-center">
          {team.map((t) => (
            <div
              key={t.name}
              className="m-4 p-4 bg-secondary rounded-lg shadow-lg"
            >
              <div className="transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                <Image
                  src={t.imageUrl || `url('/blank-person.jpeg')`}
                  alt={t.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover grayscale hover:grayscale-0"
                  width="100"
                  height="100"
                />
              </div>
              <div className="text-center mt-2">
                <p className="text-lg font-semibold">{t.name}</p>
                <p className="text-sm text-gray-600">{t.position}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
