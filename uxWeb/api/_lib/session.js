import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "ux_admin";
const MAX_AGE_SECONDS = 60 * 60 * 8;

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(getSecret());
}

function serializeCookie(value, maxAge) {
  const parts = [
    `${COOKIE_NAME}=${value}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${maxAge}`,
  ];
  // Browsers drop Secure cookies on http://localhost.
  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }
  return parts.join("; ");
}

export function setSessionCookie(res, token) {
  res.setHeader("Set-Cookie", serializeCookie(token, MAX_AGE_SECONDS));
}

export function clearSessionCookie(res) {
  res.setHeader("Set-Cookie", serializeCookie("", 0));
}

function readCookie(req, name) {
  if (req.cookies && req.cookies[name]) return req.cookies[name];

  const header = req.headers?.cookie;
  if (!header) return undefined;

  for (const pair of header.split(";")) {
    const index = pair.indexOf("=");
    if (index === -1) continue;
    if (pair.slice(0, index).trim() === name) {
      return decodeURIComponent(pair.slice(index + 1).trim());
    }
  }
  return undefined;
}

export async function getSession(req) {
  const token = readCookie(req, COOKIE_NAME);
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.role === "admin" ? payload : null;
  } catch {
    return null;
  }
}

export async function requireAdmin(req, res) {
  const session = await getSession(req);
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}
