const RECURRENCE_WINDOW_MONTHS = 12;
const WINDSOR_TIME_ZONE = "America/Toronto";
const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID?.trim();
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN?.trim();
const CONTENTFUL_ENVIRONMENT =
  process.env.CONTENTFUL_ENVIRONMENT?.trim() || "master";
const CONTENTFUL_HOST = process.env.CONTENTFUL_HOST?.trim() || "cdn.contentful.com";

const normalizeRecurrence = (value) => {
  if (!value) return null;
  const normalized = String(value).trim().toLowerCase();
  if (normalized === "weekly") return "weekly";
  if (normalized === "biweekly" || normalized === "bi-weekly") return "biweekly";
  if (normalized === "monthly") return "monthly";
  return null;
};

const addMonths = (date, months) => {
  const next = new Date(date);
  next.setUTCMonth(next.getUTCMonth() + months);
  return next;
};

const getTimeZoneParts = (date, timeZone) => {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const values = {};
  formatter.formatToParts(date).forEach(({ type, value }) => {
    if (type !== "literal") {
      values[type] = value;
    }
  });

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
    second: Number(values.second),
  };
};

const getTimeZoneOffsetMs = (date, timeZone) => {
  const parts = getTimeZoneParts(date, timeZone);
  const asUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );

  return asUtc - date.getTime();
};

const windsorLocalToUtcDate = (parts) => {
  const utcGuess = new Date(
    Date.UTC(
      parts.year,
      parts.month - 1,
      parts.day,
      parts.hour,
      parts.minute,
      parts.second
    )
  );

  const firstOffset = getTimeZoneOffsetMs(utcGuess, WINDSOR_TIME_ZONE);
  const firstPass = new Date(utcGuess.getTime() - firstOffset);
  const secondOffset = getTimeZoneOffsetMs(firstPass, WINDSOR_TIME_ZONE);

  if (firstOffset === secondOffset) {
    return firstPass;
  }

  return new Date(utcGuess.getTime() - secondOffset);
};

const parseContentfulDateAsWindsorLocal = (value) => {
  if (!value) return null;
  if (value instanceof Date) return value;

  const raw = String(value).trim();
  const match = raw.match(
    /^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2})(?::(\d{2}))?)?/
  );

  if (!match) {
    const fallback = new Date(raw);
    return Number.isNaN(fallback.getTime()) ? null : fallback;
  }

  return windsorLocalToUtcDate({
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
    hour: Number(match[4] ?? "0"),
    minute: Number(match[5] ?? "0"),
    second: Number(match[6] ?? "0"),
  });
};

const getShiftedOccurrenceStart = (start, recurrence, occurrenceIndex) => {
  const startParts = getTimeZoneParts(start, WINDSOR_TIME_ZONE);
  const localAnchor = new Date(
    Date.UTC(
      startParts.year,
      startParts.month - 1,
      startParts.day,
      startParts.hour,
      startParts.minute,
      startParts.second
    )
  );

  if (recurrence === "monthly") {
    localAnchor.setUTCMonth(localAnchor.getUTCMonth() + occurrenceIndex);
  } else if (recurrence === "biweekly") {
    localAnchor.setUTCDate(localAnchor.getUTCDate() + occurrenceIndex * 14);
  } else {
    localAnchor.setUTCDate(localAnchor.getUTCDate() + occurrenceIndex * 7);
  }

  return windsorLocalToUtcDate({
    year: localAnchor.getUTCFullYear(),
    month: localAnchor.getUTCMonth() + 1,
    day: localAnchor.getUTCDate(),
    hour: localAnchor.getUTCHours(),
    minute: localAnchor.getUTCMinutes(),
    second: localAnchor.getUTCSeconds(),
  });
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
      ? parseContentfulDateAsWindsorLocal(event.recurrenceEndDate)
      : fallbackMaxDate;
  const occurrences = [];
  let occurrenceIndex = 0;

  while (true) {
    const currentStart = getShiftedOccurrenceStart(
      event.start,
      recurrence,
      occurrenceIndex
    );
    if (currentStart > maxDate) {
      break;
    }

    const occurrence = {
      ...event,
      start: new Date(currentStart),
      end: durationMs ? new Date(currentStart.getTime() + durationMs) : event.end,
    };
    occurrences.push(occurrence);
    occurrenceIndex += 1;
  }

  return occurrences;
};

const getContentfulBaseUrl = () => {
  if (!CONTENTFUL_SPACE_ID) {
    throw new Error("Missing CONTENTFUL_SPACE_ID");
  }
  return `https://${CONTENTFUL_HOST}/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}`;
};

const createContentfulHeaders = () => {
  if (!CONTENTFUL_ACCESS_TOKEN) {
    throw new Error("Missing CONTENTFUL_ACCESS_TOKEN");
  }
  return {
    Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
  };
};

const buildEntriesUrl = (contentType, includeLevel = 2, query = null) => {
  const search = new URLSearchParams({
    content_type: contentType,
    include: String(includeLevel),
  });

  if (query) {
    const extra = new URLSearchParams(query);
    extra.forEach((value, key) => search.append(key, value));
  }

  return `${getContentfulBaseUrl()}/entries?${search.toString()}`;
};

const fetchContentfulJson = async (url, revalidateSeconds = 60) => {
  const response = await fetch(url, {
    headers: createContentfulHeaders(),
    next: { revalidate: revalidateSeconds },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Contentful ${response.status} (${response.statusText}) at ${url}. Response: ${body.slice(
        0,
        200
      )}`
    );
  }

  return response.json();
};

export async function getEventData() {
  try {
    const data = await fetchContentfulJson(buildEntriesUrl("events", 10), 60);
    const events = data.items.map((event) => ({
      title: event.fields.eventTitle,
      start: parseContentfulDateAsWindsorLocal(event.fields.startDate),
      end: parseContentfulDateAsWindsorLocal(event.fields.endDate),
      description: event.fields.description,
      recurrence: event.fields.recurrance ?? event.fields.recurrence ?? null,
      recurrenceEndDate: parseContentfulDateAsWindsorLocal(
        event.fields.recurrenceEndDate
      ),
    }));

    return events
      .flatMap(expandRecurringEvent)
      .sort((a, b) => new Date(a.start) - new Date(b.start));
  } catch (error) {
    console.error(
      `Error fetching events (space=${CONTENTFUL_SPACE_ID || "missing"}, env=${CONTENTFUL_ENVIRONMENT}, host=${CONTENTFUL_HOST}):`,
      error
    );
    return [];
  }
}

export async function getContactData() {
  try {
    const data = await fetchContentfulJson(buildEntriesUrl("contactPage", 2), 60);
    return data.items[0].fields;
  } catch (error) {
    console.error(
      `Error fetching contact data (space=${CONTENTFUL_SPACE_ID || "missing"}, env=${CONTENTFUL_ENVIRONMENT}, host=${CONTENTFUL_HOST}):`,
      error
    );
    return { error: error.message };
  }
}

export async function getPersonData() {
  try {
    const data = await fetchContentfulJson(buildEntriesUrl("person", 10), 60);
    return data.items.map((event) => ({
      name: event.fields.name,
      position: event.fields.position,
      image: event.fields.image,
    }));
  } catch (error) {
    console.error(
      `Error fetching person data (space=${CONTENTFUL_SPACE_ID || "missing"}, env=${CONTENTFUL_ENVIRONMENT}, host=${CONTENTFUL_HOST}):`,
      error
    );
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
  try {
    const url = buildEntriesUrl(contentType, includeLevel, query);
    return await fetchContentfulJson(url, revalidateSeconds);
  } catch (e) {
    console.error(
      `Failed to fetch Contentful data (type=${contentType}, space=${CONTENTFUL_SPACE_ID || "missing"}, env=${CONTENTFUL_ENVIRONMENT}, host=${CONTENTFUL_HOST}):`,
      e
    );
    return null;
  }
}

// Specific fetch for image data
export async function fetchImageData(assetId) {
  try {
    const url = `${getContentfulBaseUrl()}/assets/${assetId}`;
    const data = await fetchContentfulJson(url, 60);
    return `https:${data.fields.file.url}`; // Ensure correct URL format.
  } catch (e) {
    console.error(
      `Failed to fetch image data (assetId=${assetId}, space=${CONTENTFUL_SPACE_ID || "missing"}, env=${CONTENTFUL_ENVIRONMENT}, host=${CONTENTFUL_HOST}):`,
      e
    );
    return null;
  }
}
