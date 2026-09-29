import { query } from "./_lib/db.js";
import { SELECT_COLUMNS, rowToEvent } from "./_lib/events.js";
import { methodNotAllowed, withErrorHandling } from "./_lib/http.js";

async function handler(req, res) {
  if (req.method !== "GET") {
    return methodNotAllowed(req, res, ["GET"]);
  }

  const { rows } = await query(
    `SELECT ${SELECT_COLUMNS} FROM events WHERE published = true ORDER BY event_date DESC`
  );

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=300"
  );
  res.status(200).json({ events: rows.map(rowToEvent) });
}

export default withErrorHandling(handler);
