const RECURRENCE_LABELS = {
  weekly: "Weekly",
  biweekly: "Biweekly",
  "bi-weekly": "Biweekly",
  monthly: "Monthly",
};
const WINDSOR_TIME_ZONE = "America/Toronto";

const toDate = (value) => {
  if (!value) return null;
  return value instanceof Date ? value : new Date(value);
};

const getTimeKey = (date) => {
  if (!date) return "unknown";
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: WINDSOR_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return formatter.format(date);
};

const getSeriesKey = (event) => {
  const start = toDate(event.start);
  const end = toDate(event.end);
  const description =
    event?.extendedProps?.description ?? event?.description ?? "";
  const recurrence = event?.recurrence ?? "";

  return [
    event?.title ?? "",
    description,
    recurrence,
    getTimeKey(start),
    getTimeKey(end),
  ]
    .join("::")
    .toLowerCase()
    .trim();
};

export const getUpcomingEventGroups = (events, today = new Date()) => {
  const now = toDate(today) ?? new Date();
  const sourceEvents = Array.isArray(events) ? events : [];

  const upcoming = sourceEvents.filter((event) => {
    const start = toDate(event?.start);
    return start && start >= now;
  });

  const seriesMap = new Map();
  const singles = [];

  upcoming.forEach((event) => {
    if (event?.recurrence) {
      const key = getSeriesKey(event);
      if (!seriesMap.has(key)) {
        seriesMap.set(key, []);
      }
      seriesMap.get(key).push(event);
      return;
    }

    singles.push(event);
  });

  const recurringGroups = Array.from(seriesMap.values()).map((group) => {
    const sorted = [...group].sort(
      (a, b) => toDate(a.start) - toDate(b.start)
    );
    const next = sorted[0];
    const recurrenceKey = next?.recurrence ?? "";
    const label = RECURRENCE_LABELS[recurrenceKey?.toLowerCase?.()] ?? "Recurring";
    return {
      ...next,
      isRecurring: true,
      recurrenceLabel: label,
      recurrenceCount: sorted.length,
    };
  });

  const items = [...recurringGroups, ...singles]
    .map((event) => ({
      ...event,
      isRecurring: Boolean(event?.isRecurring),
      recurrenceLabel: event?.recurrenceLabel ?? null,
      recurrenceCount: event?.recurrenceCount ?? 0,
    }))
    .sort((a, b) => toDate(a.start) - toDate(b.start));

  return {
    items,
    totalCount: items.length,
    rawUpcomingCount: upcoming.length,
  };
};
