import { query } from "../../_lib/db.js";
import {
  SELECT_COLUMNS,
  rowToEvent,
  toColumns,
  validateEventPayload,
} from "../../_lib/events.js";
import {
  methodNotAllowed,
  readJsonBody,
  withErrorHandling,
} from "../../_lib/http.js";
import { requireAdmin } from "../../_lib/session.js";

async function handler(req, res) {
  if (!(await requireAdmin(req, res))) return;

  res.setHeader("Cache-Control", "no-store");

  if (req.method === "GET") {
    const { rows } = await query(
      `SELECT ${SELECT_COLUMNS} FROM events ORDER BY event_date DESC`
    );
    return res.status(200).json({ events: rows.map(rowToEvent) });
  }

  if (req.method === "POST") {
    let body;
    try {
      body = await readJsonBody(req);
    } catch {
      return res.status(400).json({ error: "Invalid JSON body" });
    }

    const { values, errors } = validateEventPayload(body);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join("; "), errors });
    }

    const { columns, params } = toColumns(values);
    const placeholders = params.map((_, i) => `$${i + 1}`).join(", ");

    const { rows } = await query(
      `INSERT INTO events (${columns.join(", ")})
       VALUES (${placeholders})
       RETURNING ${SELECT_COLUMNS}`,
      params
    );

    return res.status(201).json({ event: rowToEvent(rows[0]) });
  }

  return methodNotAllowed(req, res, ["GET", "POST"]);
}

export default withErrorHandling(handler);
