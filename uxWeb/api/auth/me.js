import { getSession } from "../_lib/session.js";
import { methodNotAllowed, withErrorHandling } from "../_lib/http.js";

async function handler(req, res) {
  if (req.method !== "GET") {
    return methodNotAllowed(req, res, ["GET"]);
  }

  const session = await getSession(req);
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ authenticated: Boolean(session) });
}

export default withErrorHandling(handler);
