import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import "../styles/admin.css";

const ACCEPTED = "image/jpeg,image/png,image/webp,image/gif,image/svg+xml";
const MAX_BYTES = 10 * 1024 * 1024;

// Files upload straight from the browser to Vercel Blob using a short-lived
// token from /api/admin/upload, bypassing the Functions body size limit.
export default function ImageGalleryUploader({ images, onChange, disabled }) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList || []);
    if (files.length === 0) return;

    const tooBig = files.find((file) => file.size > MAX_BYTES);
    if (tooBig) {
      setError(`"${tooBig.name}" is larger than 10MB.`);
      return;
    }

    setError("");
    setUploading(true);

    try {
      const uploaded = [];
      for (const file of files) {
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/admin/upload",
        });
        uploaded.push(blob.url);
      }
      onChange([...images, ...uploaded]);
    } catch (err) {
      setError(err?.message || "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    if (disabled || uploading) return;
    handleFiles(event.dataTransfer.files);
  };

  const removeAt = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="admin-field">
      <label>Image gallery</label>

      {images.length > 0 && (
        <div className="admin-gallery">
          {images.map((url, index) => (
            <div className="admin-gallery-item" key={`${url}-${index}`}>
              <img src={url} alt={`Gallery image ${index + 1}`} />
              <button
                type="button"
                className="admin-gallery-remove"
                onClick={() => removeAt(index)}
                aria-label={`Remove image ${index + 1}`}
                disabled={disabled}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <label
        className={`admin-dropzone ${dragActive ? "admin-dropzone--active" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled && !uploading) setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED}
          multiple
          disabled={disabled || uploading}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <strong style={{ fontWeight: 600 }}>
          {uploading ? "Uploading…" : "Drop images here or click to choose"}
        </strong>
        <span>JPEG, PNG, WebP, GIF or SVG · up to 10MB each</span>
      </label>

      {error && <span className="admin-field-hint" style={{ color: "#d53302" }}>{error}</span>}
    </div>
  );
}
