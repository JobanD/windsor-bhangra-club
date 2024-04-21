import React from "react";
import { Button, Link } from "@mui/material";
import Image from "next/image";

const SponsorCard = ({ name, image, link, description }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <Image
        src={image}
        alt={name}
        className="w-full h-auto md:w-auto object-cover rounded-lg"
        width="0"
        height="0"
        sizes="100vw"
      />
      <h3 className="text-xl font-bold mt-2">{name}</h3>
      <p className="text-gray-600">{description}</p>
      <Button
        component={Link}
        href="/team"
        sx={{
          mt: 2,
          backgroundColor: "secondary.main",
          color: "forestGreen.dark",
          fontWeight: "bold",
          fontSize: "1.6rem",
          py: 2,
          px: 10,
          borderRadius: "default",
          "&:hover": {
            backgroundColor: "secondary.dark",
          },
          "@media (max-width:700px)": {
            fontSize: "1.1rem",
          },
        }}
        variant="contained"
      >
        Learn More
      </Button>
    </div>
  );
};

export default SponsorCard;
