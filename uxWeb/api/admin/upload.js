import { handleUpload } from "@vercel/blob/client";
import {
  methodNotAllowed,
  readJsonBody,
  withErrorHandling,
} from "../_lib/http.js";
import { requireAdmin } from "../_lib/session.js";

const ALLOWED_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

async function handler(req, res) {
  if (req.method !== "POST") {
    return methodNotAllowed(req, res, ["POST"]);
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  // The browser asking for an upload token must carry an admin session. Blob's
  // own upload-completed callback carries no cookie and is authenticated by the
  // x-vercel-signature header, which handleUpload verifies.
  if (body?.type !== "blob.upload-completed") {
    if (!(await requireAdmin(req, res))) return;
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("BLOB_READ_WRITE_TOKEN is not set");
    return res.status(500).json({ error: "Image uploads are not configured" });
  }

  res.setHeader("Cache-Control", "no-store");

  const result = await handleUpload({
    body,
    request: req,
    onBeforeGenerateToken: async () => ({
      allowedContentTypes: ALLOWED_CONTENT_TYPES,
      addRandomSuffix: true,
      maximumSizeInBytes: 10 * 1024 * 1024,
    }),
    onUploadCompleted: async () => {},
  });

  res.status(200).json(result);
}

export default withErrorHandling(handler);
