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
    return data.items.map((event) => ({
      title: event.fields.eventTitle,
      start: event.fields.startDate,
      end: event.fields.endDate,
      description: event.fields.description,
    }));
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
  query = null // Optional parameter to add additional filtering
) {
  let url = `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=${contentType}&include=${includeLevel}`;

  if (query) {
    url += `&${query}`; // Append query if it's provided and correctly formatted
  }

  try {
    const response = await fetch(url);
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
