const RECURRENCE_WINDOW_MONTHS = 12;

const normalizeRecurrence = (value) => {
  if (!value) return null;
  const normalized = String(value).trim().toLowerCase();
  if (normalized === "weekly") return "weekly";
  if (normalized === "biweekly" || normalized === "bi-weekly") return "biweekly";
  if (normalized === "monthly") return "monthly";
  return null;
};

const addDays = (date, days) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

const addMonths = (date, months) => {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
};

const expandRecurringEvent = (event) => {
  if (!event.start) return [];

  const recurrence = normalizeRecurrence(event.recurrence);
  if (!recurrence) return [event];

  const durationMs =
    event.end instanceof Date
      ? event.end.getTime() - event.start.getTime()
      : event.end
      ? new Date(event.end).getTime() - new Date(event.start).getTime()
      : null;

  const fallbackMaxDate = addMonths(event.start, RECURRENCE_WINDOW_MONTHS);
  const maxDate =
    event.recurrenceEndDate instanceof Date
      ? event.recurrenceEndDate
      : event.recurrenceEndDate
      ? new Date(event.recurrenceEndDate)
      : fallbackMaxDate;
  const occurrences = [];
  let currentStart = new Date(event.start);

  while (currentStart <= maxDate) {
    const occurrence = {
      ...event,
      start: new Date(currentStart),
      end: durationMs ? new Date(currentStart.getTime() + durationMs) : event.end,
    };
    occurrences.push(occurrence);

    if (recurrence === "monthly") {
      currentStart = addMonths(currentStart, 1);
    } else if (recurrence === "biweekly") {
      currentStart = addDays(currentStart, 14);
    } else {
      currentStart = addDays(currentStart, 7);
    }
  }

  return occurrences;
};

export async function getEventData() {
  try {
    const response = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=events&include=10`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching events: ${response.status}`);
    }

    const data = await response.json();
    const events = data.items.map((event) => ({
      title: event.fields.eventTitle,
      start: event.fields.startDate ? new Date(event.fields.startDate) : null,
      end: event.fields.endDate ? new Date(event.fields.endDate) : null,
      description: event.fields.description,
      recurrence: event.fields.recurrance ?? event.fields.recurrence ?? null,
      recurrenceEndDate: event.fields.recurrenceEndDate ?? null,
    }));

    return events
      .flatMap(expandRecurringEvent)
      .sort((a, b) => new Date(a.start) - new Date(b.start));
  } catch (error) {
    console.error("Error fetching events:", error);
    return { error: error.message };
  }
}

export async function getContactData() {
  try {
    const response = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=contactPage`
    );
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const data = await response.json();
    return data.items[0].fields;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: error.message };
  }
}

export async function getPersonData() {
  try {
    const response = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=person&include=10`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching events: ${response.status}`);
    }

    const data = await response.json();
    return data.items.map((event) => ({
      name: event.fields.name,
      position: event.fields.position,
      image: event.fields.image,
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    return { error: error.message };
  }
}

// Fetch general data from Contentful
export async function fetchDataFromContentful(
  contentType,
  includeLevel = 2,
  query = null, // Optional parameter to add additional filtering
  revalidateSeconds = 60
) {
  let url = `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=${contentType}&include=${includeLevel}`;

  if (query) {
    url += `&${query}`; // Append query if it's provided and correctly formatted
  }

  try {
    const response = await fetch(url, {
      next: { revalidate: revalidateSeconds },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (e) {
    console.error("Failed to fetch data:", e);
    return null;
  }
}

// Specific fetch for image data
export async function fetchImageData(assetId) {
  const url = `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/assets/${assetId}?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return `https:${data.fields.file.url}`; // Ensure correct URL format.
  } catch (e) {
    console.error("Failed to fetch image data:", e);
    return null;
  }
}
