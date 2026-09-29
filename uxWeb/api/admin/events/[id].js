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

  const id = Number(req.query?.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid event id" });
  }

  if (req.method === "GET") {
    const { rows } = await query(
      `SELECT ${SELECT_COLUMNS} FROM events WHERE id = $1`,
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    return res.status(200).json({ event: rowToEvent(rows[0]) });
  }

  if (req.method === "PATCH") {
    let body;
    try {
      body = await readJsonBody(req);
    } catch {
      return res.status(400).json({ error: "Invalid JSON body" });
    }

    const { values, errors } = validateEventPayload(body, { partial: true });
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join("; "), errors });
    }

    const { columns, params } = toColumns(values);
    if (columns.length === 0) {
      return res.status(400).json({ error: "No updatable fields provided" });
    }

    const assignments = columns.map((column, i) => `${column} = $${i + 1}`);
    assignments.push("updated_at = now()");

    const { rows } = await query(
      `UPDATE events
       SET ${assignments.join(", ")}
       WHERE id = $${params.length + 1}
       RETURNING ${SELECT_COLUMNS}`,
      [...params, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    return res.status(200).json({ event: rowToEvent(rows[0]) });
  }

  if (req.method === "DELETE") {
    const { rowCount } = await query("DELETE FROM events WHERE id = $1", [id]);
    if (rowCount === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    return res.status(200).json({ ok: true });
  }

  return methodNotAllowed(req, res, ["GET", "PATCH", "DELETE"]);
}

export default withErrorHandling(handler);
