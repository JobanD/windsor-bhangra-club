import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

const HeroSection = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url('/heroNew.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        position: "relative",
        "::before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the color and opacity
        },
        "> *": { position: "relative" },
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        color="primary"
        fontWeight="bold"
        sx={{
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          mt: { xs: -8, md: 0 },
          mx: { xs: 3 },
        }}
      >
        <span className="text-secondary font-bold">W</span>indsor <br />
        <span className="text-secondary font-bold">B</span>hangra <br />
        <span className="text-secondary font-bold">C</span>lub
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        color="secondary"
        sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)", mx: { xs: 2 } }}
      >
        Welcome, please explore the many things IPCHAS (explain what it stands
        for) offers.
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          href="/about"
          size="large"
          sx={{ mr: 2, fontWeight: "bold" }}
        >
          Learn More
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          href="/events"
          size="large"
          sx={{ mr: 2, fontWeight: "bold" }}
        >
          Events
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;
