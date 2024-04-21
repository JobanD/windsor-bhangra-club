"use client";
import React, { useState } from "react";
import { Box, Typography, Container } from "@mui/material";

// components
import DonateForm from "@/components/forms/DonateForm";
import JoinTeamForm from "@/components/forms/JoinTeamForm";
import RegistrationForm from "@/components/forms/RegistrationForm";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Registration
        </Typography>
        <button
          className="m-10 px-10 py-2 font-16 border-black border-8"
          onClick={() => setSelectedOption("donate")}
        >
          Donate
        </button>
        <button
          className="m-10 px-10 py-2 font-16 border-black border-8"
          onClick={() => setSelectedOption("joinTeam")}
        >
          Join Team
        </button>
        <button
          className="m-10 px-10 py-2 font-16 border-black border-8"
          onClick={() => setSelectedOption("register")}
        >
          Registration
        </button>

        <div className="bg-secondary text-primary-darker p-6 rounded-lg shadow-md">
          {selectedOption === "donate" && <DonateForm />}
          {selectedOption === "joinTeam" && <JoinTeamForm />}
          {selectedOption === "register" && <RegistrationForm />}
        </div>
      </Box>
    </Container>
  );
};

export default Page;
