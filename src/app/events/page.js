import React from "react";
import { Box, Typography, Container } from "@mui/material";
import dynamic from "next/dynamic";
import { getEventData } from "@/contentful/data";

const Calendar = dynamic(
  () => import("@/components/Calendar"),
  { ssr: false } // This will ensure it's only loaded client-side
);

export default async function Events() {
  const events = await getEventData();

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Event Calendar
        </Typography>
        <Calendar events={events} />
      </Box>
    </Container>
  );
}
