import { del } from "@vercel/blob";

// Only URLs that live in a Vercel Blob store are ours to delete; anything else
// in a gallery (e.g. a pasted external link) is left alone.
function isBlobUrl(url) {
  try {
    return new URL(url).hostname.endsWith(".blob.vercel-storage.com");
  } catch {
    return false;
  }
}

// Best effort: a failed cleanup should never fail the request that triggered
// it, since the database change has already been made.
export async function deleteBlobs(urls) {
  const targets = [...new Set(urls)].filter(isBlobUrl);
  if (targets.length === 0) return;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("BLOB_READ_WRITE_TOKEN is not set; skipping blob cleanup");
    return;
  }

  try {
    await del(targets);
  } catch (error) {
    console.error("Failed to delete blobs", targets, error);
  }
}
