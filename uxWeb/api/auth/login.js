import bcrypt from "bcryptjs";
import { createSessionToken, setSessionCookie } from "../_lib/session.js";
import { methodNotAllowed, readJsonBody, withErrorHandling } from "../_lib/http.js";

async function handler(req, res) {
  if (req.method !== "POST") {
    return methodNotAllowed(req, res, ["POST"]);
  }

  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) {
    console.error("ADMIN_PASSWORD_HASH is not set");
    return res.status(500).json({ error: "Admin login is not configured" });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const password = typeof body?.password === "string" ? body.password : "";
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  const ok = await bcrypt.compare(password, hash);
  if (!ok) {
    return res.status(401).json({ error: "Incorrect password" });
  }

  setSessionCookie(res, await createSessionToken());
  res.status(200).json({ ok: true });
}

export default withErrorHandling(handler);
