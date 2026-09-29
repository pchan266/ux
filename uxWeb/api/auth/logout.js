import { clearSessionCookie } from "../_lib/session.js";
import { methodNotAllowed, withErrorHandling } from "../_lib/http.js";

async function handler(req, res) {
  if (req.method !== "POST") {
    return methodNotAllowed(req, res, ["POST"]);
  }

  clearSessionCookie(res);
  res.status(200).json({ ok: true });
}

export default withErrorHandling(handler);
