import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteEvent,
  listAdminEvents,
  updateEvent,
} from "../../lib/adminApi";
import { formatEventDate } from "../../lib/formatEventDate";
import "../../styles/admin.css";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [confirmingId, setConfirmingId] = useState(null);

  const navigate = useNavigate();

  const handleApiError = useCallback(
    (err) => {
      if (err.status === 401) {
        navigate("/admin/login", { replace: true, state: { from: "/admin" } });
        return;
      }
      setError(err.message || "Something went wrong");
    },
    [navigate]
  );

  useEffect(() => {
    let active = true;

    listAdminEvents()
      .then((data) => {
        if (active) setEvents(data);
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
  }, [handleApiError]);

  const handleTogglePublished = async (event) => {
    setBusyId(event.id);
    setError("");
    try {
      const updated = await updateEvent(event.id, {
        published: !event.published,
      });
      setEvents((current) =>
        current.map((item) => (item.id === updated.id ? updated : item))
      );
    } catch (err) {
      handleApiError(err);
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (event) => {
    setBusyId(event.id);
    setError("");
    try {
      await deleteEvent(event.id);
      setEvents((current) => current.filter((item) => item.id !== event.id));
      setConfirmingId(null);
    } catch (err) {
      handleApiError(err);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <>
      <title>Events Admin - Queen's UX Club</title>

      <div className="admin-page-head">
        <div>
          <h2>All events</h2>
          <span className="admin-muted">
            {loading
              ? "Loading…"
              : `${events.length} event${events.length === 1 ? "" : "s"} · ${
                  events.filter((e) => e.published).length
                } live on the site`}
          </span>
        </div>
        <Link to="/admin/events/new" className="admin-btn admin-btn--primary">
          New event
        </Link>
      </div>

      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      {loading ? (
        <div className="admin-loading">Loading events…</div>
      ) : events.length === 0 ? (
        <div className="admin-empty">
          No events yet. Create the first one to get started.
        </div>
      ) : (
        <div className="admin-list">
          {events.map((event) => (
            <div className="admin-row" key={event.id}>
              <div className="admin-row-main">
                <div className="admin-row-title">
                  <span>{event.title}</span> — {event.subtitle}
                </div>
                <div className="admin-row-meta">
                  {formatEventDate(event.date)} · {event.time} · {event.location}
                  {event.imageGallery.length > 0 &&
                    ` · ${event.imageGallery.length} image${
                      event.imageGallery.length === 1 ? "" : "s"
                    }`}
                </div>
              </div>

              <span
                className={`admin-badge ${
                  event.published ? "admin-badge--live" : "admin-badge--hidden"
                }`}
              >
                {event.published ? "Published" : "Hidden"}
              </span>

              <div className="admin-row-actions">
                <button
                  type="button"
                  className="admin-btn admin-btn--secondary admin-btn--small"
                  onClick={() => handleTogglePublished(event)}
                  disabled={busyId === event.id}
                >
                  {event.published ? "Unpublish" : "Publish"}
                </button>
                <Link
                  to={`/admin/events/${event.id}`}
                  className="admin-btn admin-btn--secondary admin-btn--small"
                >
                  Edit
                </Link>
                {confirmingId === event.id ? (
                  <>
                    <button
                      type="button"
                      className="admin-btn admin-btn--danger admin-btn--small"
                      onClick={() => handleDelete(event)}
                      disabled={busyId === event.id}
                    >
                      {busyId === event.id ? "Deleting…" : "Confirm delete"}
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn--secondary admin-btn--small"
                      onClick={() => setConfirmingId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="admin-btn admin-btn--danger admin-btn--small"
                    onClick={() => setConfirmingId(event.id)}
                    disabled={busyId === event.id}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
