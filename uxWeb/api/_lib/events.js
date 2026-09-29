export const SELECT_COLUMNS = `
  id,
  title,
  subtitle,
  description_present,
  description_past,
  event_date,
  event_time,
  location,
  signup_link,
  image_gallery,
  published,
  created_at,
  updated_at
`;

export function rowToEvent(row) {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    descriptionPresent: row.description_present,
    descriptionPast: row.description_past,
    date: row.event_date,
    time: row.event_time,
    location: row.location,
    signupLink: row.signup_link,
    imageGallery: row.image_gallery ?? [],
    published: row.published,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const FIELD_TO_COLUMN = {
  title: "title",
  subtitle: "subtitle",
  descriptionPresent: "description_present",
  descriptionPast: "description_past",
  date: "event_date",
  time: "event_time",
  location: "location",
  signupLink: "signup_link",
  imageGallery: "image_gallery",
  published: "published",
};

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateEventPayload(body, { partial = false } = {}) {
  const errors = [];
  const values = {};

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { values, errors: ["Request body must be a JSON object"] };
  }

  const has = (key) => Object.prototype.hasOwnProperty.call(body, key);
  const required = (key) => !partial || has(key);

  if (required("title")) {
    const title = normalizeString(body.title);
    if (!title) errors.push("title is required");
    else values.title = title;
  }

  if (required("subtitle")) {
    const subtitle = normalizeString(body.subtitle);
    if (!subtitle) errors.push("subtitle is required");
    else values.subtitle = subtitle;
  }

  if (required("descriptionPresent")) {
    const text = normalizeString(body.descriptionPresent);
    if (!text) errors.push("descriptionPresent is required");
    else values.descriptionPresent = text;
  }

  if (has("descriptionPast")) {
    values.descriptionPast = normalizeString(body.descriptionPast);
  } else if (!partial) {
    values.descriptionPast = "";
  }

  if (required("date")) {
    const date = normalizeString(body.date);
    if (!DATE_PATTERN.test(date)) {
      errors.push("date must be in YYYY-MM-DD format");
    } else if (Number.isNaN(Date.parse(date))) {
      errors.push("date is not a real calendar date");
    } else {
      values.date = date;
    }
  }

  if (required("time")) {
    const time = normalizeString(body.time);
    if (!time) errors.push("time is required");
    else values.time = time;
  }

  if (required("location")) {
    const location = normalizeString(body.location);
    if (!location) errors.push("location is required");
    else values.location = location;
  }

  if (has("signupLink")) {
    values.signupLink = normalizeString(body.signupLink);
  } else if (!partial) {
    values.signupLink = "";
  }

  if (has("imageGallery")) {
    const gallery = body.imageGallery;
    if (gallery === null) {
      values.imageGallery = [];
    } else if (!Array.isArray(gallery)) {
      errors.push("imageGallery must be an array of image URLs");
    } else if (!gallery.every((item) => typeof item === "string")) {
      errors.push("imageGallery must contain only strings");
    } else {
      values.imageGallery = gallery.map((item) => item.trim()).filter(Boolean);
    }
  } else if (!partial) {
    values.imageGallery = [];
  }

  if (has("published")) {
    if (typeof body.published !== "boolean") {
      errors.push("published must be a boolean");
    } else {
      values.published = body.published;
    }
  } else if (!partial) {
    values.published = false;
  }

  return { values, errors };
}

export function toColumns(values) {
  const columns = [];
  const params = [];

  for (const [field, value] of Object.entries(values)) {
    const column = FIELD_TO_COLUMN[field];
    if (!column) continue;
    columns.push(column);
    params.push(value);
  }

  return { columns, params };
}
