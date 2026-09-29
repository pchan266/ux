import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ImageGalleryUploader from "../../components/ImageGalleryUploader";
import { createEvent, getAdminEvent, updateEvent } from "../../lib/adminApi";
import "../../styles/admin.css";

const EMPTY_EVENT = {
  title: "",
  subtitle: "",
  descriptionPresent: "",
  descriptionPast: "",
  date: "",
  time: "",
  location: "",
  signupLink: "",
  imageGallery: [],
  published: false,
};

export default function AdminEventForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY_EVENT);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleApiError = useCallback(
    (err) => {
      if (err.status === 401) {
        navigate("/admin/login", {
          replace: true,
          state: { from: isEdit ? `/admin/events/${id}` : "/admin/events/new" },
        });
        return;
      }
      setError(err.message || "Something went wrong");
    },
    [navigate, id, isEdit]
  );

  useEffect(() => {
    if (!isEdit) return;

    let active = true;

    getAdminEvent(id)
      .then((event) => {
        if (!active) return;
        setForm({
          title: event.title ?? "",
          subtitle: event.subtitle ?? "",
          descriptionPresent: event.descriptionPresent ?? "",
          descriptionPast: event.descriptionPast ?? "",
          date: event.date ?? "",
          time: event.time ?? "",
          location: event.location ?? "",
          signupLink: event.signupLink ?? "",
          imageGallery: event.imageGallery ?? [],
          published: Boolean(event.published),
        });
      })
      .catch((err) => {
        if (active) handleApiError(err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id, isEdit, handleApiError]);

  const setField = (field) => (event) => {
    const value =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (isEdit) {
        await updateEvent(id, form);
      } else {
        await createEvent(form);
      }
      navigate("/admin");
    } catch (err) {
      handleApiError(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading event…</div>;
  }

  return (
    <>
      <title>
        {isEdit ? "Edit event" : "New event"} - Queen's UX Club Admin
      </title>

      <div className="admin-page-head">
        <div>
          <h2>{isEdit ? "Edit event" : "New event"}</h2>
          <span className="admin-muted">
            {form.published
              ? "This event is visible on the public events page."
              : "This event is hidden from the public events page."}
          </span>
        </div>
        <Link to="/admin" className="admin-btn admin-btn--secondary">
          Back to list
        </Link>
      </div>

      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-field-grid">
          <div className="admin-field">
            <label htmlFor="title">Category</label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={setField("title")}
              placeholder="Workshops"
              required
            />
            <span className="admin-field-hint">
              The coloured word on the card, e.g. "Workshops" or "Events".
            </span>
          </div>

          <div className="admin-field">
            <label htmlFor="subtitle">Title</label>
            <input
              id="subtitle"
              type="text"
              value={form.subtitle}
              onChange={setField("subtitle")}
              placeholder="Intro to Figma"
              required
            />
            <span className="admin-field-hint">
              The event's own name, shown under the category.
            </span>
          </div>
        </div>

        <div className="admin-field-grid">
          <div className="admin-field">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={form.date}
              onChange={setField("date")}
              required
            />
            <span className="admin-field-hint">
              Events dated today or later show under "Upcoming".
            </span>
          </div>

          <div className="admin-field">
            <label htmlFor="time">Time</label>
            <input
              id="time"
              type="text"
              value={form.time}
              onChange={setField("time")}
              placeholder="6:00 PM - 8:00 PM"
              required
            />
          </div>

          <div className="admin-field">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              value={form.location}
              onChange={setField("location")}
              placeholder="Goodes Hall, Rm 302"
              required
            />
          </div>
        </div>

        <div className="admin-field">
          <label htmlFor="descriptionPresent">Description — upcoming</label>
          <textarea
            id="descriptionPresent"
            value={form.descriptionPresent}
            onChange={setField("descriptionPresent")}
            placeholder="Learn how to use Figma to design wireframes and prototypes…"
            required
          />
          <span className="admin-field-hint">
            Future tense. Shown while the event is still upcoming.
          </span>
        </div>

        <div className="admin-field">
          <label htmlFor="descriptionPast">Description — after the event</label>
          <textarea
            id="descriptionPast"
            value={form.descriptionPast}
            onChange={setField("descriptionPast")}
            placeholder="Students learned how to use Figma to design wireframes…"
          />
          <span className="admin-field-hint">
            Past tense. Swapped in automatically once the date has passed.
          </span>
        </div>

        <div className="admin-field">
          <label htmlFor="signupLink">Sign-up link</label>
          <input
            id="signupLink"
            type="url"
            value={form.signupLink}
            onChange={setField("signupLink")}
            placeholder="https://forms.gle/…"
          />
          <span className="admin-field-hint">
            Optional. Used by the "Sign up" button on upcoming event cards.
          </span>
        </div>

        <ImageGalleryUploader
          images={form.imageGallery}
          onChange={(imageGallery) =>
            setForm((current) => ({ ...current, imageGallery }))
          }
          disabled={saving}
        />

        <div className="admin-field">
          <div className="admin-checkbox">
            <input
              id="published"
              type="checkbox"
              checked={form.published}
              onChange={setField("published")}
            />
            <label htmlFor="published">
              Published
              <span
                className="admin-field-hint"
                style={{ display: "block", fontWeight: 400 }}
              >
                Show this event on the public events page.
              </span>
            </label>
          </div>
        </div>

        <div className="admin-form-actions">
          <button
            type="submit"
            className="admin-btn admin-btn--primary"
            disabled={saving}
          >
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create event"}
          </button>
          <Link to="/admin" className="admin-btn admin-btn--secondary">
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}
