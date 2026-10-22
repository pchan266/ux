export function methodNotAllowed(req, res, allowed) {
  res.setHeader("Allow", allowed.join(", "));
  res.status(405).json({ error: `Method ${req.method} not allowed` });
}

export async function readJsonBody(req) {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === "string") {
      if (!req.body) return {};
      return JSON.parse(req.body);
    }
    if (Buffer.isBuffer(req.body)) {
      const text = req.body.toString("utf8");
      return text ? JSON.parse(text) : {};
    }
    return req.body;
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const text = Buffer.concat(chunks).toString("utf8");
  return text ? JSON.parse(text) : {};
}

export function withErrorHandling(handler) {
  return async (req, res) => {
    try {
      return await handler(req, res);
    } catch (error) {
      console.error(`${req.method} ${req.url} failed`, error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  };
}
