import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { fetchDataFromContentful, fetchImageData } from "@/contentful/data";

export default async function MeetTheTeamPage() {
  // Fetch basic team data
  const teamData = await fetchDataFromContentful("person", 10);

  if (!teamData || teamData.error) {
    return <div>Error: {teamData.error}</div>;
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
            <Box key={t.name}>
              <Image
                src={t.imageUrl || "/default-avatar.png"}
                alt={t.name}
                width="100"
                height="100"
              />
              <Typography>{t.name}</Typography>
              <Typography>{t.position}</Typography>
            </Box>
          ))}
        </div>
      </section>
    </div>
  );
}
