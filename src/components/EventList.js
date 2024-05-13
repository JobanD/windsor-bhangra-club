import { Stack, Box } from "@mui/material";
import EventCard from "./EventListCard";
import { getEventData } from "@/contentful/data";

export default async function EventList() {
  const events = await getEventData();
  console.log(events);

  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2}>
        {events.map((event) => (
          <EventCard key={`${event.start}-${event.title}`} event={event} />
        ))}
      </Stack>
    </Box>
  );
}
